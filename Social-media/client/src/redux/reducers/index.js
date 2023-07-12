import {combineReducers} from 'redux';
import posts from './posts'

export default combineReducers({
    // key: value
    posts: posts,
})

