import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-slice";
import storiesSlice from "./stories-slice";
import redirectSlice from "./redirect-slice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    stories: storiesSlice.reducer,
    redirect: redirectSlice.reducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
