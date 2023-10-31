import mongoose from 'mongoose';
import Users from '../models/userModel';

export const updateUser = async (req, res ,next) => {

    // get info user by request
    const {
        firstName,
        lastName,
        email,
        contact,
        location,
        profileUrl,
        jobTitle,
        about
    } = req.body

    try {
        if(!firstName || !lastName || !email 
            || !contact || !jobTitle || !about){
            next("Please Provide all required fields");
        }

        const id = req.body.user.userId;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`Not found user with id: ${id}`)
        }

        const updateUser = {
            firstName,
            lastName,
            email,
            contact,
            location,
            profileUrl,
            jobTitle,
            about,
            _id: id,
        };

        const user = await Users.findByIdAndUpdate(id, updateUser, {new: true});
        const token = user.createJWT();
        user.password = undefined;
        res.status(200).json({
            success: true,
            message: "User Updated Successfullt",
            user,
            token
        })

    } catch (error) {
        console.error(error);
        res.status(404).json({message: error.message});
    }
}