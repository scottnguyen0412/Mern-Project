import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';
import userAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user
router.post("/get-user", userAuth, getUser);

// Update user
router.put("/update-user", userAuth, updateUser);

export default router;