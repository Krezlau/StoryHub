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
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      // call the api
      // for now imma do this
      state.userToken = action.payload.email;
      state.isLoggedIn = true;
      // fetch user data from api
      state.userName = "Krezlau";
      state.email = "test@test.com";
      state.created = new Date().toISOString();
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
        nickname: string;
        email: string;
        password: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.userName = action.payload.nickname;
      state.email = action.payload.email;
      state.created = new Date().toISOString();
      // temp
      state.userToken = action.payload.nickname;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
