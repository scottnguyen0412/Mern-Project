import { ACTION_TYPES } from "../../constants/actionTypes";

export default (state = {isLoading: true, posts: []}, action) => {
  switch (action.type) {
    case ACTION_TYPES[8]:
      return {...state, isLoading: true};
    case ACTION_TYPES[9]:
      return {...state, isLoading: false};
    case ACTION_TYPES[0]:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPage: action.payload.numberOfPage
      };
    case ACTION_TYPES[1]:
      // Sao chép toàn bộ phần tử của mảng posts,
      // và thêm phần tử mới vào cuối mảng bằng cách sử dụng action.payload
      return { ...state, posts: [...state.posts, action.payload] };
    case ACTION_TYPES[2]:
      // check id post = id payload thì cho phép update mặt khác thì giữ nguyên dữ liệu post
      return {...state, posts: state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )};
    case ACTION_TYPES[3]:
      return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
    case ACTION_TYPES[4]:
      return {...state, posts: state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )};
    case ACTION_TYPES[7]:
      return {...state, posts: action.payload};
    case ACTION_TYPES[10]:
      return {...state, post: action.payload.post};
    case ACTION_TYPES[11]:
      return {...state, posts: state.posts.map((post) => {
        // Với mỗi post trong mảng cũ, nếu ID của post trùng với ID của post trong payload của action, 
        // nghĩa là action này đã cập nhật post mới nhất
          if(post._id === action.payload._id) {
            return action.payload
          }
          return post;
      })}
    default:
      return state;
  }
};
