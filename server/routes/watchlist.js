import express from "express";

import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlist.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getWatchlist);
router.post("/add", auth, addToWatchlist);
router.post("/remove", auth, removeFromWatchlist);

export default router;
