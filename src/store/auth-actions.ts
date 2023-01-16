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
  email: string,
  createdAt: string
) => {
  const currentTime = new Date();
  const expirationTime = new Date(
    currentTime.getTime() + 60 * 60000
  ).toISOString();

  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expirationTime);
  localStorage.setItem("userId", userId);
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("createdAt", createdAt);
};

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const storedUserId = localStorage.getItem("userId");
  const storedUsername = localStorage.getItem("username");
  const storedEmail = localStorage.getItem("email");
  const storedCreatedAt = localStorage.getItem("createdAt");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (
    remainingTime <= 60000 ||
    !storedToken ||
    !storedEmail ||
    !storedUsername ||
    !storedCreatedAt ||
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
    email: storedEmail,
    createdAt: storedCreatedAt,
  };
};

export const loginUser = (
  email: string,
  password: string,
  setIsLoading: (newState: boolean) => void,
  setError: (newState: string) => void
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    setIsLoading(true);
    setError("");

    const loginUser = async () => {
      let response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBX14QGRIuDqIQ830ByACAAXgJBpdeYNYE",
        { email, password, returnSecureToken: true },
        { headers: { "Content-Type": "application/json" } }
      );
      if (!response || !response.data.idToken || response.status > 299) {
        throw new Error("Response incorrect.");
      }
      return response.data.idToken;
    };

    const fetchUserData = async (idToken: string) => {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBX14QGRIuDqIQ830ByACAAXgJBpdeYNYE",
        { idToken: idToken },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response || !response.data.users[0].localId) {
        throw new Error("Response incorrect.");
      }
      return response.data.users[0];
    };

    const fetchCreatedAt = async (userId: string) => {
      const response = await axios.get(
        "https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          userId +
          ".json"
      );

      if (!response || !response.data.created) {
        throw new Error("Response incorrect.");
      }

      return response.data.created;
    };

    try {
      const idToken = await loginUser();
      const userData = await fetchUserData(idToken);
      const createdAt = await fetchCreatedAt(userData.localId);
      dispatch(
        authActions.login({
          userId: userData.localId,
          userToken: idToken,
          username: userData.displayName,
          email: email,
          created: createdAt,
        })
      );
      storeAuthData(
        idToken,
        60,
        userData.localId,
        userData.displayName,
        email,
        createdAt
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
          email: email,
          created: new Date().toDateString(),
          userId: localId,
        })
      );
      storeAuthData(
        idToken,
        60,
        localId,
        username,
        email,
        new Date().toDateString()
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
