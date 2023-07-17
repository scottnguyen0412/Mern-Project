
export default (posts = [], action) => {
    switch (action.type) { 
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            // Sao chép toàn bộ phần tử của mảng posts, 
            // và thêm phần tử mới vào cuối mảng bằng cách sử dụng action.payload
            return [...posts, action.payload];
        case 'UPDATE':
            // check id post = id payload thì cho phép update mặt khác thì giữ nguyên dữ liệu post
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case 'DELETE':
            return posts.filter((post) => post._id !== action.payload)
        case 'LIKE_POST':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        default:
            return posts;
    }
}