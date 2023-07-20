import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5001"});
const postUrl = "/posts"

export const fetchAllPosts = () => {
  return API.get(postUrl);
};

export const createPost = (newPost) => {
  return API.post(`${postUrl}/createPost`, newPost);
}

export const updatePost = (id, updatePost) => {
  return API.patch(`${postUrl}/updatePost/${id}`, updatePost); 
}

export const deletePost = (id) => {
  return API.delete(`${postUrl}/deletePost/${id}`);
}

export const likePost = (id) => {
  return API.patch(`${postUrl}/post/${id}/likePost`);
}

// api for login and logout
export const signIn = (formData) => API.post('/user/login', formData);
export const signUp = (formData) => API.post('/user/register', formData);

