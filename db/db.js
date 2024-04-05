import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoose connected".magenta.bold);
  } catch (error) {
    console.log(`mongoose error`.red.bold);
  }
};

export default connectDb;
