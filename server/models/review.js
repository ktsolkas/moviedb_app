import pkg from "mongoose";
const { Schema, model } = pkg;

const reviewSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  rating: { type: String, required: true },
  movieId: { type: Number, required: true },
  userEmail: { type: String, required: true },
  addedAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Review = model("Review", reviewSchema);

export default Review;
