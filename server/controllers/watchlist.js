import Watchlist from "../models/watchlist.js";

export const addToWatchlist = async (req, res) => {
  const movie = req.body;
  const userId = req.userId;

  const existingWatchlist = await Watchlist.findOne({ userId });

  try {
    let result;
    if (existingWatchlist) {
      result = await existingWatchlist.updateOne({
        userId: userId,
        $push: { watchlist: req.body },
      });
      res.status(200).json({ result, userId, message: "userId exists" });
    } else {
      const watchlist = await Watchlist.create({
        userId: userId,
        watchlist: [movie],
      });
      res.status(200).json({ watchlist, userId });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.updateOne(
      { userId: req.userId },
      { $pull: { watchlist: { movieId: req.body.movieId } } }
    );
    res.status(200).json({ watchlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const data = await Watchlist.aggregate([
      { $match: { userId: req.userId } },
      { $project: { _id: 0, results: "$watchlist" } },
    ]);
    res.status(200).json({ results: data[0].results });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
