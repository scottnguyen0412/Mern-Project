import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });
const postUrl = "/posts";

// Đính token của account vào header của các request API
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPost = (id) => {
  return API.get(`${postUrl}/detail/${id}`);
}

export const fetchAllPosts = (page) => {
  return API.get(`${postUrl}?page=${page}`);
};

// api for search
export const fetchByPost = (searchQuery) => {
  return API.get(
    `${postUrl}/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
};

export const createPost = (newPost) => {
  return API.post(`${postUrl}/createPost`, newPost);
};

export const updatePost = (id, updatePost) => {
  return API.patch(`${postUrl}/updatePost/${id}`, updatePost);
};

export const deletePost = (id) => {
  return API.delete(`${postUrl}/deletePost/${id}`);
};

export const likePost = (id) => {
  return API.patch(`${postUrl}/post/${id}/likePost`);
};

export const comment = (comment, id) => {return API.post(`${postUrl}/post/${id}/commentPost`,{comment})};

// api for login and logout
export const signIn = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/register", formData);
