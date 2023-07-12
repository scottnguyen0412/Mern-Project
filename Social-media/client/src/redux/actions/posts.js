// Sử dụng tất cả api trong folder api
import * as api from '../../api';

// Action Creators
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