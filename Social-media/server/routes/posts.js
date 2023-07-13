import express from 'express';
import {getPost, createPost, updatePost} from '../controllers/postController.js'

const router = express.Router();

router.get('/', getPost)
router.post('/createPost', createPost)
router.patch('/updatePost/:id', updatePost)


export default router;