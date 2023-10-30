import mongoose from "mongoose";

const dbConfig = async () => {
    try {
        const CONNECTION_URL = process.env.MONGODB_CLOUD
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(CONNECTION_URL, options)
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error("Database Error: " + error);
    }
}

export default dbConfig