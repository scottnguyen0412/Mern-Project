import mongoose from "mongoose";
import Jobs from "../models/jobModel";

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