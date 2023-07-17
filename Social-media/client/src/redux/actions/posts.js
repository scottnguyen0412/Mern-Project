// Sử dụng tất cả api trong folder api
import * as api from '../../api';

// Action Creators
// fetch post
export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchAllPosts();
        dispatch({
            type: 'FETCH_ALL',
            payload: data 
        })
    } catch (error) {
        console.error(error.message);
    } 
}

// create new post
export const addPosts = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        dispatch({
            type: 'CREATE',
            payload: data
        })
    } catch (error) {
        console.error(error);
    }
}

// Update post
export const updatePosts = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);
        dispatch({
            type: 'UPDATE',
            payload: data
        })
    } catch (error) {
        console.error(error);        
    }
}

// Delete post
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({
            type: 'DELETE',
            payload: id,
        })
    } catch (error) {
        console.error(error);
    }
}

// Like post
export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({
            type: 'LIKE_POST',
            payload: data
        })
    } catch (error) {
        console.error(error);
    }
}