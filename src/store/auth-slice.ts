import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  userToken: string;
  isLoggedIn: boolean;
  userName: string;
  email: string;
  created: string;
}

const initialState: IAuthState = {
  userToken: "",
  isLoggedIn: false,
  userName: "",
  email: "",
  created: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        email: string;
        username: string;
        userToken: string;
        created: string;
      }>
    ) => {
      state.userToken = action.payload.userToken;
      state.isLoggedIn = true;
      state.userName = action.payload.username;
      state.email = action.payload.email;
      state.created = action.payload.created;
    },
    logout: (state) => {
      state.userToken = initialState.userToken;
      state.isLoggedIn = initialState.isLoggedIn;
      state.email = initialState.email;
      state.created = initialState.created;
      state.userName = initialState.userName;
    },
    register: (
      state,
      action: PayloadAction<{
        idToken: string;
        username: string;
        email: string;
        created: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.userName = action.payload.username;
      state.email = action.payload.email;
      state.created = action.payload.created;
      state.userToken = action.payload.idToken;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
