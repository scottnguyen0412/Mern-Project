import express from 'express';
import {getPost, createPost} from '../controllers/postController.js'

const router = express.Router();

router.get('/', getPost)
router.post('/createPost', createPost)


export default router;