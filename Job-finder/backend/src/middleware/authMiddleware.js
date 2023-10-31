import JWT from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const authHandler = req?.headers?.authorization;
    
    if(!authHandler || !authHandler?.startsWith("Bearer")) {
        next("Authentication Failed");
    }   

    // Lấy token được response từ header
    // split() được sử dụng để tách chuỗi "Bearer <token>" thành một mảng gồm 2 phần tử
    // Bearer là phần tử đầu tiên
    // <token> là phần tử thứ 2
    // vì vậy [1] để trả về token
    const token = authHandler?.split(" ")[1]

    try {
        const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

        req.body.user = {
            userId: userToken.userId
        }

        next()
    } catch (error) {
        console.log(error);
        next("Authentication Failed");
    }
};