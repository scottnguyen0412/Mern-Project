import express from 'express';
import {getPost, createPost, updatePost, deletePost, likePost} from '../controllers/postController.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPost)
router.post('/createPost', auth, createPost)
router.patch('/updatePost/:id', auth, updatePost)
router.delete('/deletePost/:id', auth, deletePost)
router.patch('/post/:id/likePost', auth,likePost)


export default router;