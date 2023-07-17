import express from 'express';
import {getPost, createPost, updatePost, deletePost, likePost} from '../controllers/postController.js'

const router = express.Router();

router.get('/', getPost)
router.post('/createPost', createPost)
router.patch('/updatePost/:id', updatePost)
router.delete('/deletePost/:id', deletePost)
router.patch('/post/:id/likePost', likePost)


export default router;