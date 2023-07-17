import mongoose from "mongoose";
import PostMessage from "../models/postMessageModel.js";

export const getPost = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        console.log(postMessage);

        // nếu thành công trả về dữ liệu dưới dạng json
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    // Get id params
    const {id: _id} = req.params
    const post = req.body;

    // Check id exist in DB
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with this id');
    }

    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})
    res.status(200).json(updatePost);
}

export const deletePost = async(req, res) => {
    // Get id params
    const {id} = req.params

    // Check id exist in DB
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with this id');
    }

    await PostMessage.findByIdAndRemove(id);
    res.status(200).json({message: 'Post deleted successfully'});
}

export const likePost = async(req, res) => {
    // Get id params
    const {id} = req.params

    // Check id exist in DB
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with this id');
    }

    const post = await PostMessage.findById(id);
    // Chỉ update likeCount trong PostMessage table chứ không phải toàn bộ bản
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});
    res.status(200).json(updatePost);
}