import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import Movie from "../../common/types/Movie";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { watchlist: [] as Movie[] },
  reducers: {
    updateWatchlist(state, action: PayloadAction<Movie[]>) {
      state.watchlist = action.payload;
    },
    addMovieToWatchlist(state, action: PayloadAction<Movie>) {
      state.watchlist.push(action.payload);
    },
    removeMovieFromWatchlist(state, action: PayloadAction<number>) {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.movieId !== action.payload
      );
    },
    clearWatchlist(state, _action: PayloadAction) {
      state.watchlist = [];
    },
  },
});

export const selectWatchlistMovieIds = (state: RootState) =>
  state.watchlist.watchlist.map((movie) => movie.movieId);

export const selectMoviesInWatchlist = (state: RootState) =>
  state.watchlist.watchlist;

export const {
  updateWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  clearWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
