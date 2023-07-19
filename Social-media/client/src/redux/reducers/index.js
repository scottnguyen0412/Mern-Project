import {combineReducers} from 'redux';
import posts from './posts'
import authReducers from './auth';

export const reducers = combineReducers({
    // key: value
    posts: posts,
    auth: authReducers,
})

