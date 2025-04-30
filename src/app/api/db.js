// db.js
import mongoose from "mongoose";
const url='mongodb+srv://contactshamim62:Koltech123@cluster0.siioaq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error);
    process.exit(1); 
  }
};
export default connectDB;
