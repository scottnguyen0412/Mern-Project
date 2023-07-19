import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js';


const app = express();


// Dòng đầu tiên: sử dụng method json() của body-parser để phân tích dữ liệu dạng JSON.
// Cụ thể, limit cho phép giới hạn kích thước tối đa của request body là 30MB và extended cho phép phân tích cấu trúc dữ liệu phức tạp hơn.
app.use(bodyParser.json({limit: "30mb", extended: true}))

// Sử dụng method urlencoded() để phân tích dữ liệu từ request body dạng application/x-www-form-urlencoded
// sử dụng để giới hạn kích thước dữ liệu và mở rộng cấu trúc dữ liệu của request body.
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
// ----------- Nhờ hai dòng trên ứng dụng có thể phân tích và xử lý các request body có dạng JSON 
// -----------hoặc application/x-www-form-urlencoded được gửi từ client đến server

app.use(cors())

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Database mongDb connection
const CONNECTION_URL = process.env.MONGODB_CLOUD
const PORT = process.env.PORT || 3002;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, console.log(`Server running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message));

// Tắt tính năng cảnh báo sử dụng findOneAndUpdate() và findOneAndDelete() mặc định của Mongoose
