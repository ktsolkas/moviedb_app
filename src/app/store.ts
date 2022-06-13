import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { moviedbApi } from "./services/moviedbApi";

export const store = configureStore({
  reducer: {
    [moviedbApi.reducerPath]: moviedbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviedbApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
