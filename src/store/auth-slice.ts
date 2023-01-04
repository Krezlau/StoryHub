import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  userToken: string;
  isLoggedIn: boolean;
}

const initialState: IAuthState = { userToken: "", isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      // call the api
      // for now imma do this
      state.userToken = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userToken = "";
    },
    register: (
      state,
      action: PayloadAction<{
        nickname: string;
        email: string;
        password: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.userToken = action.payload.nickname;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
