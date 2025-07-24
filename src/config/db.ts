import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string, {
      dbName: "autoapply",
    });
    console.log("mongodb connection is ready");
  } catch (error) {
    console.log("mongoDB connection error");
    process.exit(1);
  }
};

export default connectDB;
