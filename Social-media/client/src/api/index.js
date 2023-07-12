import axios from 'axios';

const urlAPI = 'http://localhost:3002/posts'

export const fetchAllPosts = async () => {
    await axios.get(urlAPI);
} 