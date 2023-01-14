import { createSlice } from "@reduxjs/toolkit";

export interface IThemeState {
  isDark: boolean;
}

const initialState: IThemeState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggle: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice;
