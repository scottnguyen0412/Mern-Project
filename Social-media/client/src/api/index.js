import axios from "axios";

const urlAPI = "http://localhost:3002/posts";

export const fetchAllPosts = () => {
  return axios.get(urlAPI);
};

export const createPost = (newPost) => {
  return axios.post(`${urlAPI}/createPost`, newPost);
}

export const updatePost = (id, updatePost) => {
  return axios.patch(`${urlAPI}/updatePost/${id}`, updatePost); 
}

export const deletePost = (id) => {
  return axios.delete(`${urlAPI}/deletePost/${id}`)
}