// Sử dụng tất cả api trong folder api
import * as api from '../../api';
import {ACTION_TYPES} from '../../constants/actionTypes';

// Action Creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: ACTION_TYPES[8]})
        const {data} = await api.fetchPost(id);
        // console.log(data);
        dispatch({
            type: ACTION_TYPES[10],
            payload: {post: data}
        })
        dispatch({type: ACTION_TYPES[9]})
    } catch (error) {
        console.error(error.message);
    } 
}

// fetch post
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: ACTION_TYPES[8]})
        const {data} = await api.fetchAllPosts(page);
        console.log(data);
        dispatch({
            type: ACTION_TYPES[0],
            payload: data 
        })
        dispatch({type: ACTION_TYPES[9]})
    } catch (error) {
        console.error(error.message);
    } 
}

// search by post
export const getPostBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({type: ACTION_TYPES[8]})
        const {data: {data}} = await api.fetchByPost(searchQuery);
        dispatch({
            type: ACTION_TYPES[7],
            payload: data 
        })
        dispatch({type: ACTION_TYPES[9]})
    } catch (error) {   
        console.log(error);
    }
}
 
// create new post
export const addPosts = (post) => async (dispatch) => {
    try {
        dispatch({type: ACTION_TYPES[8]})
        const {data} = await api.createPost(post);
        dispatch({
            type: ACTION_TYPES[1],
            payload: data
        })
        dispatch({type: ACTION_TYPES[9]})
    } catch (error) {
        console.error(error);
    }
}

// Update post
export const updatePosts = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);
        dispatch({
            type: ACTION_TYPES[2],
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
            type: ACTION_TYPES[3],
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
            type: ACTION_TYPES[4],
            payload: data
        })
    } catch (error) {
        console.error(error);
    }
}