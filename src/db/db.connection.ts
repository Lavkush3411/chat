import mongoose from "mongoose";

export const dbConnection = async () => {
  mongoose
    .connect("mongodb://localhost:27017/chat")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};
