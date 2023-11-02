import express from "express";
import authRoute from './authRoutes.js'
import userRoute from './userRoutes.js'
import companyRoute from './companyRoutes.js'
import jobRoute from './jobRoutes.js';

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute);
router.use(`${path}users`, userRoute);
router.use(`${path}company`, companyRoute);
router.use(`${path}job`, jobRoute);

export default router;