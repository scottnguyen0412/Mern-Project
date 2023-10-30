import express from 'express';
import {rateLimit} from 'express-rate-limit';
import { login, register } from '../controllers/authController.js';

// IP rate limit
const limiter = rateLimit({
    windowMs: 15*60*1000, //15 minutes
    max: 100, //giới hạn tối đa 100 yêu cầu được phép trong 15 phút.
    standardHeaders: true,
    legacyHeaders: false,
})

const router = express.Router();

// register routes
router.post("/register", register);
router.post("/login", login);

export default router;