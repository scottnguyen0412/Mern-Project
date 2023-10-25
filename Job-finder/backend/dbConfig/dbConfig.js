import mongoose from "mongoose";

const dbConfig = async () => {
    try {
        const CONNECTION_URL = process.env.MONGODB_CLOUD
        const dbConnection = await mongoose.connect(CONNECTION_URL)
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error("Database Error: " + error);
    }
}

export default dbConfig