import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { moviedbApi } from "./services/moviedbApi";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    [moviedbApi.reducerPath]: moviedbApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviedbApi.middleware),
  devTools: {
    stateSanitizer: (state: any) => {
      const { api, ...rest } = state;
      const { queries, ...restApi } = api;
      const filteredQueries = Object.keys(queries)
        .filter((value) => !value.startsWith("getMovieImage"))
        .reduce((accumulator, currentKey) => {
          return Object.assign(accumulator, {
            [currentKey]: queries[currentKey],
          });
        }, {});

      return { api: { queries: { ...filteredQueries }, ...restApi }, ...rest };
    },
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
