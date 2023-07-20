import jwt  from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        // Lấy token được response từ header
        // split() được sử dụng để tách chuỗi "Bearer <token>" thành một mảng gồm 2 phần tử
        // Bearer là phần tử đầu tiên
        // <token> là phần tử thứ 2
        // vì vậy [1] để trả về token
        const token = res.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        
        let decodedData;
        if(token && isCustomAuth) {
            // 'test' secret key tự đặt. Phải trùng với secret key khi tạo token
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;