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
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: error.message
        })
    }
}   

// export const updateJob = async (req, res, next) => {

// }