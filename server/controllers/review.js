import Review from "../models/review.js";

export const addReview = async (req, res) => {
  try {
    const review = req.body;
    const newReview = await Review.create(review);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const removeReview = async (req, res) => {
  try {
    const review = await Review.deleteOne({ _id: req.body.id });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editReview = async (req, res) => {
  try {
    const review = await Review.updateOne(
      { _id: req.body._id },
      { title: req.body.title, body: req.body.body, rating: req.body.rating }
    );
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.path.slice(7) });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
