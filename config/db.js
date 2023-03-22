const mongoose = require("mongoose");
const DB = process.env.DB;
// const MONGO_URI = process.env.MONGO_URI_SUB;

mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://nishanth:nish1234@cluster0.bbodeek.mongodb.net/ebo_blog`);
    console.log(`MongoDB connected to: ${conn.connection.host}`);//.cyan.underline
  } catch (error) {
    console.log(`Error: ${error.message}`);//.red.bold
    process.exit(1);
  }
};

module.exports = connectDB;