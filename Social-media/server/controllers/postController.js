import mongoose from "mongoose";
import PostMessage from "../models/postMessageModel.js";

export const getPost = async (req, res) => {
  const { page } = req.query;
  try {
    // limit posts per page
    const LIMIT = 2;
    // index page
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});
    // sort newest to oldest
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    console.log(posts);

    // nếu thành công trả về dữ liệu dưới dạng json
    res
      .status(200)
      .json({
        data: posts,
        currentPage: Number(page),
        numberOfPage: Math.ceil(total / LIMIT),
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  // Xác thực người dùng tạo post là ai
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    created_at: new Date().toISOString(),
  });
  try {
    await newPost.save();

    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  // Get id params
  const { id: _id } = req.params;
  const post = req.body;

  // Check id exist in DB
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with this id");
  }

  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.status(200).json(updatePost);
};

export const deletePost = async (req, res) => {
  // Get id params
  const { id } = req.params;

  // Check id exist in DB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with this id");
  }

  await PostMessage.findByIdAndRemove(id);
  res.status(200).json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  // Get id params
  const { id } = req.params;

  // check user authenticated or not
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  // Check id exist in DB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with this id");
  }

  const post = await PostMessage.findById(id);

  // check user like this post or not
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  // Chỉ update likeCount trong PostMessage table chứ không phải toàn bộ bản
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

// search post
export const getPostBySearch = async (req, res) => {
  // get query
  const { searchQuery, tags } = req.query;
  try {
    // 'i' sử dụng để cho phép tìm kiếm không phân biệt chữ hoa/chữ thường
    const title = new RegExp(searchQuery, "i");
    // $or: cho phép ta tìm kiếm các bản ghi trong cơ sở dữ liệu dựa trên nhiều điều kiện tại cùng một thời điểm.
    // $in: được sử dụng để tìm kiếm các giá trị trong một mảng.
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDetailPost = async (req, res) => {
  const {id} = req.params;
  try {
      const post = await PostMessage.findById(id);
      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const commentPost = async (req, res) => {
  const {id} = req.params;
  const {comment} = req.body;
  const post = await PostMessage.findById(id);
  post.comments.push(comment);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
  res.json(updatedPost)
}
