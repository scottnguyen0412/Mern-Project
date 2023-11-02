import mongoose from "mongoose";
import Jobs from "../models/jobModel";

// Create Job Post
export const createJob = async (req, res, next) => {
    try {
        const {jobTitle, JobType, 
            location, salary, vacanies, 
            experience, desc, requirements} = req.body;

        if(!jobTitle || !JobType || !location || 
            !salary || !requirements || desc) 
            {
                next("Please Provide All Required Fields");
                return;
            }

        const id = req.body.user.userId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send(`No Company with id: ${id}`);
        }

        const createPostJob = {
            jobTitle, JobType, 
            location, salary, vacanies, 
            experience, details: {desc, requirements},
            company: id
        } 
        const newJob = new Jobs(createPostJob);
        await newJob.save();
        res.status(200).json({
            success: true,
            message: "Post Created Successfully",
            newJob
        })
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: error.message
        })
    }
}   

// Update Job Post 
export const updateJob = async (req, res, next) => {
    const { id } = req.params;
    const jobPost = req.body
    // Check id exist in DB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with this id ${id}`);
    }
    try {
        const updateJob = await Jobs.findByIdAndUpdate(id, jobPost, {
            new: true,
          });
          res.status(200).json({
            success: true,
            message: "Post Updated Successfully",
            updateJob
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: error.message
        })
    }
}

// Get Job Posts
export const getJobPosts = async (req, res, next) => {
    try {
        const {search, sort, location, jtype, exp} = req.query;
        const types = jtype.split(','); //ex: full-time,part-time
        const experience = exp.split('-'); //ex: 2-6

        let queryObject = {};
        if(location){
            queryObject.location = {$regex: location, $options: "i"};
        }
        
        if(jtype){
            queryObject.location = {$in: types};
        }

        if(exp){
            queryObject.experience = {
                // $gte (lớn hơn hoặc bằng)
                $gte: experience[0],
                // $lte (nhỏ hơn hoặc bằng)
                $lte: experience[1],
            }
        }

        if(search){
            // search by job title, job type or tags
            const searchQuery = {
                $or: [
                    {jobTitle: {$regex: search, $options: "i"}},
                    {JobType: {$regex: search, $options: "i"}},
                ]
            };
            queryObject = {...queryObject, ...searchQuery}
        }

        let queryResult = Jobs.find(queryObject).populate({
            path: "company",
            select: "-password"
        })

        // Sorting
        switch (sort) {
            case "Newest":
                queryResult = queryResult.sort("-createdAt");
                break;
            case "Oldest":
                queryResult = queryResult.sort("createdAt");
                break;
            case "A-Z":
                queryResult = queryResult.sort("jobTitle");
                break;
            case "Z-A":
                queryResult = queryResult.sort("-jobTitle");
                break;
            default:
                // Xử lý khi giá trị sort không khớp với các case trên
                break;
        }

        // Paginations
        const page = Number(req.query.page) || 1
        
        // giới hạn bao nhiêu item trong 1 page 
        const limit = Number(req.query.limit) || 20
        const skip = (page - 1) * limit;

        const totalJobs = await Jobs.countDocuments(queryResult);
        const numOfPage = Math.ceil(total/ limit);
        queryResult = queryResult.limit(limit * page);
        const jobs = await queryResult;
        res.status(200).json({
            success: true,
            totalJobs,
            data: jobs,
            page,
            numOfPage
        })
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: error.message
        })
    }
}