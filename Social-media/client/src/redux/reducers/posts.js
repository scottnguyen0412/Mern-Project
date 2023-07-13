
export default (posts = [], action) => {
    switch (action.type) { 
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            // Sao chép toàn bộ phần tử của mảng posts, 
            // và thêm phần tử mới vào cuối mảng bằng cách sử dụng action.payload
            return [...posts, action.payload];
        default:
            return posts;
    }
}