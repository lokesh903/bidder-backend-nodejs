import mongoose from "mongoose";
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/sample";
const mongodb = async () => {
  try {
    const connection = await mongoose.connect(url);
    console.log('Mongoose connected');
    
  } catch (error) {
    console.error(error);
  }
};

export default mongodb;
 