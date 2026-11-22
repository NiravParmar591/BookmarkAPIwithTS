import mongoose from "mongoose";

export const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("database connected successfully");
    } catch (err) {
        console.log("database connection error");
        console.error(err);
    }
};