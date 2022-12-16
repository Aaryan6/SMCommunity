import express from "express";
import {
  addPost,
  deletePost,
  dislike,
  getPosts,
  like,
} from "../controllers/post.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", verifyToken, addPost);
router.delete("/:id", verifyToken, deletePost);
router.put("/like/:id", verifyToken, like);
router.put("/dislike/:id", verifyToken, dislike);

export default router;
