import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { authActions } from "./auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./index";
import { IUser } from "../pages/ProfilePage";
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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("createdAt");
};

const storeAuthData = (
  token: string,
  validFor: number,
  userId: string,
  username: string,
) => {
  const currentTime = new Date();
  const expirationTime = new Date(
    currentTime.getTime() + 60 * 60000
  ).toISOString();

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

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (
    remainingTime <= 60000 ||
    !storedToken ||
    !storedUsername ||
    !storedUserId
  ) {
    clearAuthStorage();
    return null;
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
        60,
        userData.result.user.id,
        userData.result.user.username,
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

export const signUpUser = (
  username: string,
  email: string,
  password: string,
  setIsLoading: (newState: boolean) => void,
  setError: (newState: string) => void
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    setIsLoading(true);
    setError("");

    const signUp = async () => {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBX14QGRIuDqIQ830ByACAAXgJBpdeYNYE",
        { email, password, returnSecureToken: true },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response.data.idToken) {
        throw new Error("Response incorrect.");
      }

      return response.data.idToken;
    };

    const postUserData = async (idToken: string) => {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBX14QGRIuDqIQ830ByACAAXgJBpdeYNYE",
        {
          idToken,
          displayName: username,
          photoUrl: "",
          returnSecureToken: false,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response.data.localId) {
        throw new Error("Could not fetch.");
      }

      return response.data.localId;
    };

    const storeUserData = async (userId: string) => {
      const user: IUser = {
        name: username,
        email,
        created: new Date().toDateString(),
      };

      const response = await axios.put(
        `https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
        user,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status > 299) {
        throw new Error("Could not fetch.");
      }
    };

    try {
      const idToken = await signUp();
      const localId = await postUserData(idToken);
      await storeUserData(localId);
      dispatch(
        authActions.register({
          idToken: idToken,
          username: username,
          userId: localId,
        })
      );
      storeAuthData(
        idToken,
        60,
        localId,
        username,
      );
      setIsLoading(false);
      setError("");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setError("Could not sign up.");
    }
  };
};

export const useAuthDispatch: () => AppDispatch = useDispatch;
