import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected 👍"); 
    } catch (error) {
        console.log("Conniction fail ⚠️",error);
    }
}