import express from "express";
import { getPosts, createPost, updatePost, deletePost, getPostByid } from "../controllers/posts.js";
import { checkMiddleware } from "../middleware/auth.js";
const router = express.Router();

// GET ALL POST
router.get('/', checkMiddleware ,getPosts);

// GET POST BY ID
router.get('/:_id', checkMiddleware, getPostByid);

// CREATE NEW ONE POST
router.post('/', checkMiddleware, createPost);

// UPDATE ONE POST
router.post('/update', checkMiddleware, updatePost);

// DELETE ONE POST BY ID
router.delete('/delete/:_id', checkMiddleware, deletePost);

export default router;