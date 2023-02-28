import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  userToken: string;
  isLoggedIn: boolean;
  userId: string;
  userName: string;
}

const initialState: IAuthState = {
  userToken: "",
  isLoggedIn: false,
  userId: "",
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        username: string;
        userToken: string;
        userId: string;
      }>
    ) => {
      state.userToken = action.payload.userToken;
      state.isLoggedIn = true;
      state.userName = action.payload.username;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.userToken = initialState.userToken;
      state.isLoggedIn = initialState.isLoggedIn;
      state.userName = initialState.userName;
      state.userId = initialState.userId;
    },
    register: (
      state,
      action: PayloadAction<{
        idToken: string;
        username: string;
        userId: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.userName = action.payload.username;
      state.userToken = action.payload.idToken;
      state.userId = action.payload.userId;
    },
    refresh: (state, action: PayloadAction<{ token: string }>) => {
      state.userToken = action.payload.token;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
