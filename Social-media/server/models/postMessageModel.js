import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    // Chứa nhiều tags
    tags: [String],
    selectedFile: String,
    // Nếu không có like nào thì giá trị mặc định sẽ là 0
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: [],
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;