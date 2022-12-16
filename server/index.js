import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import watchlistRoutes from "./routes/watchlist.js";
import userRoutes from "./routes/user.js";
import reviewRoutes from "./routes/review.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/watchlist", watchlistRoutes);
app.use("/user", userRoutes);
app.use("/review", reviewRoutes);

const CONNECTION_URL =
  "mongodb+srv://usernamekt:usernamekt123@cluster0.vpi3s.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log(error.message));

app.get("/", (req, res) => {
  res.cookie("cookieName", "cookieValue", { sameSite: "none", secure: true });
  res.send("APP IS RUNNING.");
});
