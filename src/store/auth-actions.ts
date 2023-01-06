import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { authActions } from "./auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./index";
import { IUser } from "../pages/ProfilePage";

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const login = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBX14QGRIuDqIQ830ByACAAXgJBpdeYNYE",
        {
          method: "POST",
          body: JSON.stringify({ email, password, returnSecureToken: true }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch.");
      }

      return await response.json();
    };

    const fetchUserData = async (idToken: string) => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBX14QGRIuDqIQ830ByACAAXgJBpdeYNYE",
        {
          method: "POST",
          body: JSON.stringify({ idToken }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch.");
      }

      return await response.json();
    };

    const fetchCreatedAt = async (userId: string) => {
      const response = await fetch(
        "https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          userId +
          ".json"
      );

      if (!response.ok) {
        throw new Error('Could not fetch.')
      }

      return await response.json();
    };

    try {
      const loginData = await login();
      const userData = await fetchUserData(loginData.idToken);
      const joinedAtData = await fetchCreatedAt(userData.users[0].localId);
      dispatch(
        authActions.login({
          email: userData.users[0].email,
          userToken: loginData.idToken,
          username: userData.users[0].displayName,
          created: joinedAtData.created,
          userId: userData.users[0].localId,
        })
      );
    } catch (e) {
      // handle
      console.log(e);
    }
  };
};

export const singUpUser = (
  username: string,
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const siqnUp = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBX14QGRIuDqIQ830ByACAAXgJBpdeYNYE",
        {
          method: "POST",
          body: JSON.stringify({ email, password, returnSecureToken: true }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch.");
      }

      return await response.json();
    };

    const postUserData = async (idToken: string) => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBX14QGRIuDqIQ830ByACAAXgJBpdeYNYE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken,
            displayName: username,
            photoUrl: "",
            returnSecureToken: false,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch.");
      }

      return await response.json();
    };

    const storeUserData = async (userId: string) => {
      const user: IUser = {
        name: username,
        email,
        created: new Date().toDateString(),
      };

      const response = await fetch(
        "https://storyhub-aed69-default-rtdb.europe-west1.firebasedatabase.app/users/" +
          userId +
          ".json",
        {
          method: "PUT",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch.");
      }

      return response.json();
    };

    try {
      const signUpData = await siqnUp();
      const postData = await postUserData(signUpData.idToken);
      await storeUserData(postData.localId);
      dispatch(
        authActions.register({
          idToken: signUpData.idToken,
          username: username,
          email: email,
          created: new Date().toDateString(),
          userId: postData.localId,
        })
      );
    } catch (e) {
      // handle
      console.log(e);
    }
  };
};

export const useAuthDispatch: () => AppDispatch = useDispatch;
