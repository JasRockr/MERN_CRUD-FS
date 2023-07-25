import mongoose from "mongoose";
import { config } from "../config.js";

// Connection vars for Mongo Atlas
const db_user = encodeURIComponent(process.env.DB_MONGO_USER);
const db_pass = encodeURIComponent(process.env.DB_MONGO_PASS);
// const db_user = process.env.DB_MONGO_USER;
// const db_pass = process.env.DB_MONGO_PASS;
const db_host = process.env.DB_MONGO_CLUSTER;
const db_name = process.env.DB_MONGO_DATABASE;

// String connection
const mongoDB = `mongodb+srv://${db_user}:${db_pass}@${db_host}/${db_name}?retryWrites=true&w=majority`;

// Connection DB
const connectDB = async () => {
  try {
    //
    const dbConn = await mongoose.connect(mongoDB);
    // console.log(dbConn)
    console.log("Mongoose Connected!");
  } catch (error) {
    //
    console.log(
      "Error in DB connection : " + JSON.stringify(error.message, undefined, 2)
    );
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected Success!!");
});

mongoose.connection.on("disconnect", () => {
  console.log("MongoDB Disconnect Success !!");
});

export default connectDB;
