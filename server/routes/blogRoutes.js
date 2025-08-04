import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  postComment,
  deleteBlog,
  getCommentsByUser,
} from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/user-comments/:name", getCommentsByUser);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog);
router.post("/", upload.single("image"), createBlog);
router.post("/comment", postComment);

export default router;
