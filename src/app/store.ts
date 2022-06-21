import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { api, moviedbApi } from "./services/api";
import searchReducer from "../features/search/searchSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [moviedbApi.reducerPath]: moviedbApi.reducer,
    [api.reducerPath]: api.reducer,
    search: searchReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviedbApi.middleware).concat(api.middleware),
  devTools: {
    stateSanitizer: (state: any) => {
      const { moviedbApi, ...rest } = state;
      const { queries, ...restApi } = moviedbApi;
      const filteredQueries = Object.keys(queries)
        .filter((value) => !value.startsWith("getMovieImage"))
        .reduce((accumulator, currentKey) => {
          return Object.assign(accumulator, {
            [currentKey]: queries[currentKey],
          });
        }, {});

      return {
        moviedbApi: { queries: { ...filteredQueries }, ...restApi },
        ...rest,
      };
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
