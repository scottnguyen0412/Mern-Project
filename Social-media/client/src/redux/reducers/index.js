import {combineReducers} from 'redux';
import posts from './posts'

export const reducers = combineReducers({
    // key: value
    posts: posts,
})

