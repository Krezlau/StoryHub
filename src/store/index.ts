import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-slice";
import storiesSlice from "./stories-slice";

const store = configureStore({
  reducer: { auth: AuthSlice.reducer, stories: storiesSlice.reducer },
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;