import express from "express";

import {
  getMovieReviews,
  addReview,
  removeReview,
  editReview,
} from "../controllers/review.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/movie/:movieId", getMovieReviews);
router.post("/", auth, addReview);
router.post("/delete", auth, removeReview);
router.post("/edit", auth, editReview);

export default router;
