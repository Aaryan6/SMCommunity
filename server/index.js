import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";

const app = express();

// middleware
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(cookieParser());

// mongo db connection
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};
mongoose.set("strictQuery", true);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.get("/", (req, res) => {
  res.send("Social Media Community Server Page.");
});

// running on port
app.listen(process.env.PORT, () => {
  connect();
  console.log("Server connected.");
});
