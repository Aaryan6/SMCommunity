import express from "express";
import {
  deleteUser,
  follow,
  unfollow,
  updateUser,
  getUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/:id", getUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.put("/:id", verifyToken, updateUser);
router.put("/follow/:id", verifyToken, follow);
router.put("/unfollow/:id", verifyToken, unfollow);

export default router;
