import express from 'express';
import {rateLimit} from 'express-rate-limit';
import { getAllCompany, getCompany, getCompanyJob, getDetailCompany, loginCompany, registerCompany, updateCompanyProfile } from '../controllers/companiesController.js';
import userAuth from '../middleware/authMiddleware.js'
// IP rate limit
const limiter = rateLimit({
    windowMs: 15*60*1000, //15 minutes
    max: 100, //giới hạn tối đa 100 yêu cầu được phép trong 15 phút.
    standardHeaders: true,
    legacyHeaders: false,
})

const router = express.Router();

// register company
router.post('/register', limiter, registerCompany);

// login company
router.post('/login', limiter, loginCompany)

// get company profile
router.post('/get-company-profile', userAuth, getCompany);

// search by job company
router.post('/get-company-joblist', userAuth, getCompanyJob);

// get all companies
router.get('/', getAllCompany);

// get detail company
router.get('/detail-company:id', userAuth, getDetailCompany);

// update company
router.put('/update-company', userAuth, updateCompanyProfile);

export default router