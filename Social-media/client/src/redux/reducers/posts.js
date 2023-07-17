import {ACTION_TYPES} from '../../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) { 
        case ACTION_TYPES[0]:
            return action.payload;
        case ACTION_TYPES[1]:
            // Sao chép toàn bộ phần tử của mảng posts, 
            // và thêm phần tử mới vào cuối mảng bằng cách sử dụng action.payload
            return [...posts, action.payload];
        case ACTION_TYPES[2]:
            // check id post = id payload thì cho phép update mặt khác thì giữ nguyên dữ liệu post
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case ACTION_TYPES[3]:
            return posts.filter((post) => post._id !== action.payload)
        case ACTION_TYPES[4]:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
            return posts;
    }
}