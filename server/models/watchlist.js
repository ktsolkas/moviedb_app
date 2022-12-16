import pkg from "mongoose";

const { Schema, model } = pkg;

const watchlistSchema = new Schema({
  userId: { type: String, required: true },
  watchlist: [
    {
      movieId: { type: Number, required: true },
      title: { type: String, required: true },
      poster_path: { type: String, required: true },
      vote_average: { type: Number, required: true },
      genre_ids: { type: [Number], required: true },
    },
  ],
});

const Watchlist = model("Watchlist", watchlistSchema);

export default Watchlist;
