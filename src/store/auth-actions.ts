import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { authActions } from "./auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./index";
import { IUser } from "../pages/ProfilePage";
import axios from "axios";

export const loginUser = (
  email: string,
  password: string,
  setIsLoading: (newState: boolean) => void,
  setNotificationMessage: (newState: string) => void
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    setIsLoading(true);

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
      setIsLoading(false);
      setNotificationMessage("Success.");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setNotificationMessage("Could not login.");
      return;
    }
  };
};

export const singUpUser = (
  username: string,
  email: string,
  password: string,
  setIsLoading: (newState: boolean) => void,
  setNotificationMessage: (newState: string) => void
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    setIsLoading(true);
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
      setNotificationMessage("Success.");
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setNotificationMessage("Could not sign up.");
    }
  };
};

export const useAuthDispatch: () => AppDispatch = useDispatch;
