import mongoose from "mongoose";
import * as fs from 'fs';

if (process.env.NODE_ENV && process.env.NODE_ENV == "development") {
  mongoose.set("debug", true);
}

async function connect() {
  await mongoose.connect(getConnStr());
  console.log("Connected to MongoDB");
}

function getConnStr() {
  try {
    let str = fs.readFileSync('conn_str', 'utf8');
    console.log("Using connection string from file", str);
    return str;
  } catch (error) {
    const defaultConn = "mongodb://root:tiger@127.0.0.1:27017/nodejsapi?authSource=admin";
    console.log("Using default connection string", defaultConn);
    return defaultConn;
  }
}

export default connect;
