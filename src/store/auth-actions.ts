import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { authActions } from "./auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./index";
import axios from "axios";

const calculateRemainingTime = (expirationTime: string | null) => {
  if (expirationTime === null) {
    return 0;
  }
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
};

export const clearAuthStorage = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("createdAt");
};

const storeAuthData = (
  token: string,
  refreshToken: string,
  validFor: number,
  userId: string,
  username: string
) => {
  const currentTime = new Date();
  const expirationTime = new Date(
    currentTime.getTime() + 60 * 60000
  ).toISOString();

  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expirationTime);
  localStorage.setItem("userId", userId);
  localStorage.setItem("username", username);
};

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const storedUserId = localStorage.getItem("userId");
  const storedUsername = localStorage.getItem("username");
  const refreshToken = localStorage.getItem("refreshToken");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (
    remainingTime <= 60000 ||
    !storedToken ||
    !storedUsername ||
    !storedUserId
  ) {
    if (!refreshToken || !storedToken || !storedUsername || !storedUserId) {
      clearAuthStorage();
      return null;
    }
    try {
      axios
        .post(
          "https://storyhubapi.azurewebsites.net/api/auth/refresh",
          { storedToken, refreshToken },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((r) => localStorage.setItem("token", r.data.result));
    } catch (e) {
      return null;
    }
  }
  return {
    token: storedToken,
    duration: remainingTime,
    userId: storedUserId,
    username: storedUsername,
  };
};

export const loginUser = (
  username: string,
  password: string,
  setIsLoading: (newState: boolean) => void,
  setError: (newState: string) => void
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    setIsLoading(true);
    setError("");

    const loginUser = async () => {
      let response = await axios.post(
        "https://storyhubapi.azurewebsites.net/api/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status !== 200) {
        throw new Error("Response incorrect.");
      }
      return response.data;
    };

    try {
      const userData = await loginUser();
      dispatch(
        authActions.login({
          userId: userData.result.user.id,
          userToken: userData.result.accessToken,
          username: userData.result.user.username,
        })
      );
      storeAuthData(
        userData.result.accessToken,
        userData.result.refreshToken,
        60,
        userData.result.user.id,
        userData.result.user.username
      );
      setError("");
      setIsLoading(false);
    } catch (e) {
      setError("Could not login.");
      console.log(e);
      setIsLoading(false);
      return;
    }
  };
};

export const useAuthDispatch: () => AppDispatch = useDispatch;
