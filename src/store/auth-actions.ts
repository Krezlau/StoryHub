import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { authActions } from "./auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./index";

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

    try {
      const loginData = await login();
      const userData = await fetchUserData(loginData.idToken);
      dispatch(
        authActions.login({
          email: userData.users[0].email,
          userToken: loginData.idToken,
          username: userData.users[0].displayName,
          created: userData.users[0].createdAt,
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

    try {
      const signUpData = await siqnUp();
      const postData = await postUserData(signUpData.idToken);
      dispatch(
        authActions.register({
          idToken: signUpData.idToken,
          username: username,
          email: email,
          created: postData.email,
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
