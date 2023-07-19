import * as api from '../../api';
import {ACTION_TYPES} from '../../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // login in user
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // register user
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}