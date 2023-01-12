import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IErrorState {
  title: string;
  message: string;
  isShown: boolean;
}

const initialState: IErrorState = {
  title: "",
  message: "",
  isShown: false,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    show: (
      state: IErrorState,
      action: PayloadAction<{ title: string; message: string }>
    ) => {
      state.message = action.payload.message;
      state.title = action.payload.title;
      state.isShown = true;
    },
    hide: (state: IErrorState) => {
      state.isShown = false;
    },
  },
});

export const errorActions = errorSlice.actions;
export default errorSlice;
