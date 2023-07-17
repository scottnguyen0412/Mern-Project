import express from 'express';
import {getPost, createPost, updatePost, deletePost} from '../controllers/postController.js'

const router = express.Router();

router.get('/', getPost)
router.post('/createPost', createPost)
router.patch('/updatePost/:id', updatePost)
router.delete('/deletePost/:id', deletePost)


export default router;