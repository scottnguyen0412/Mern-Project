import express from 'express';
import { createJob, deletePost, getJobById, getJobPosts, updateJob } from '../controllers/jobController.js';
import userAuth from '../middleware/authMiddleware.js'
const router = express.Router();

// create job post
router.post("/upload-job", userAuth, createJob);

// update job post
router.patch("/update-job/:id", userAuth, updateJob);

// get job post
router.get("/find-job", getJobPosts);
router.get('/get-job-detail/:id', getJobById);

// delete job post
router.delete('/delete-job/:id', userAuth, deletePost);
export default router;