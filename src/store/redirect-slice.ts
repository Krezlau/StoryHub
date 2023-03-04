// used to redirect back to previous page after logging in
import { createSlice } from "@reduxjs/toolkit";

interface IRedirectState {
  goBack: boolean;
}

const initialState: IRedirectState = { goBack: false };

const redirectSlice = createSlice({
  name: "redirect",
  initialState,
  reducers: {
    enable: (state: IRedirectState) => {
      state.goBack = true;
    },
    disable: (state: IRedirectState) => {
      state.goBack = false;
    },
  },
});

export const redirectActions = redirectSlice.actions;

export default redirectSlice;
