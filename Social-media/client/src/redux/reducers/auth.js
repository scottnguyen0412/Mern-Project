import {ACTION_TYPES} from '../../constants/actionTypes';

const authReducers = (state = {authData: null}, action) => {
    switch (action.type) {
        case ACTION_TYPES[5]:
            // convert string to object and store to localstorage
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data};
        // case ACTION_TYPES[6]:

        default:
            return state;
    }
}

export default authReducers;