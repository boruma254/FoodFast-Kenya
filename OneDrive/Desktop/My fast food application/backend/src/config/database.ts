import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_ATLAS_URI ||
      process.env.MONGODB_URI ||
      "mongodb://localhost:27017/fooddelivery_kenya";

    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default mongoose;
