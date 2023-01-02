import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-slice";

const store = configureStore({
  reducer: { auth: AuthSlice.reducer },
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;