import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  userToken: string;
  isLoggedIn: boolean;
  userId: string;
  userName: string;
  email: string;
  created: string;
}

const initialState: IAuthState = {
  userToken: "",
  isLoggedIn: false,
  userId: "",
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
        userId: string;
      }>
    ) => {
      state.userToken = action.payload.userToken;
      state.isLoggedIn = true;
      state.userName = action.payload.username;
      state.email = action.payload.email;
      state.created = action.payload.created;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.userToken = initialState.userToken;
      state.isLoggedIn = initialState.isLoggedIn;
      state.email = initialState.email;
      state.created = initialState.created;
      state.userName = initialState.userName;
      state.userId = initialState.userId;
    },
    register: (
      state,
      action: PayloadAction<{
        idToken: string;
        username: string;
        email: string;
        created: string;
        userId: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.userName = action.payload.username;
      state.email = action.payload.email;
      state.created = action.payload.created;
      state.userToken = action.payload.idToken;
      state.userId = action.payload.userId;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
