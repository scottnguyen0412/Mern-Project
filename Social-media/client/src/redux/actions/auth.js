import * as api from '../../api';
import {ACTION_TYPES} from '../../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // login in user
        const { data } = await api.signIn(formData);
        dispatch({
            type: ACTION_TYPES[5],
            data
        })
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({
            type: ACTION_TYPES[5],
            data
        })
        // register user
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}