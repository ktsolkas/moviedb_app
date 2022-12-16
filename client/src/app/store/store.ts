import {
  configureStore,
  ThunkAction,
  Action,
  Middleware,
} from "@reduxjs/toolkit";

import { serverApi, moviedbApi } from "./services/api";
import searchReducer from "./searchSlice";
import authReducer, { logout } from "./authSlice";
import movieReducer from "./movieSlice";
import watchlistReducer, { clearWatchlist } from "./watchlistSlice";

const checkTokenExpirationMiddleware: Middleware =
  (store) => (next) => (action) => {
    const tokenExpirationDate = new Date(
      JSON.parse("" + localStorage.getItem("profile"))?.tokenExpirationDate
    );
    const now = new Date();
    if (now > tokenExpirationDate) {
      next(action);
      store.dispatch(logout());
      store.dispatch(clearWatchlist());
    }
    next(action);
  };

export const store = configureStore({
  reducer: {
    [moviedbApi.reducerPath]: moviedbApi.reducer,
    [serverApi.reducerPath]: serverApi.reducer,
    search: searchReducer,
    auth: authReducer,
    movie: movieReducer,
    watchlist: watchlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(moviedbApi.middleware)
      .concat(serverApi.middleware)
      .concat(checkTokenExpirationMiddleware),
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
