import express from "express";
import {
  getPostBySearch,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getDetailPost,
  commentPost
} from "../controllers/postController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostBySearch);
router.get("/", getPost);
router.get("/detail/:id", getDetailPost);
router.post("/createPost", auth, createPost);
router.patch("/updatePost/:id", auth, updatePost);
router.delete("/deletePost/:id", auth, deletePost);
router.patch("/post/:id/likePost", auth, likePost);
router.post('/post/:id/commentPost', auth, commentPost);

export default router;
