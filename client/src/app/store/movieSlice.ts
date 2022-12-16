import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";
import Review from "../../common/types/Review";

const movieSlice = createSlice({
  name: "movie",
  initialState: { reviews: [] as Review[] },
  reducers: {
    addReview(state, action: PayloadAction<Review>) {
      state.reviews.push(action.payload);
    },
    addReviews(state, action: PayloadAction<Review[]>) {
      if (
        state.reviews.some(
          (value) => value.movieId === action.payload[0]?.movieId
        )
      ) {
        return;
      }
      state.reviews.push(...action.payload);
    },
    clearReviews(state, _action: PayloadAction) {
      state.reviews = [];
    },
    removeReview(state, action: PayloadAction<string>) {
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload
      );
    },
    editReview(state, action: PayloadAction<Partial<Review>>) {
      const { title, body, rating, _id } = action.payload;
      const index = state.reviews.findIndex((item: Review) => item._id === _id);
      state.reviews[index] = {
        ...state.reviews[index],
        title: title!,
        body: body!,
        rating: rating!,
      };
    },
  },
});

export const selectReviewsByMovieId = (state: RootState, movieId: number) =>
  state.movie.reviews.filter((review) => review.movieId === movieId);

export const { addReview, addReviews, clearReviews, removeReview, editReview } =
  movieSlice.actions;

export default movieSlice.reducer;
