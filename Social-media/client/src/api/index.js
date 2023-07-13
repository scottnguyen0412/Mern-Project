import axios from "axios";

const urlAPI = "http://localhost:3002/posts";

export const fetchAllPosts = () => {
  return axios.get(urlAPI);
};

export const createPost = (newPost) => {
  return axios.post(`${urlAPI}/createPost`, newPost);
}
