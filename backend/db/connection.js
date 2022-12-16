import mongoose from "mongoose";
import * as fileSys from 'fs';

if (process.env.NODE_ENV && process.env.NODE_ENV == "development") {
  mongoose.set("debug", true);
}

async function connect() {
  await mongoose.connect(getConnStr());
  console.log("Connected to MongoDB");
}

function getConnStr() {
  try {
    //there should be a file called conn_str in the root folder
    let str = fileSys.readFileSync('conn_str', 'utf8');
    console.log("Using connection string from file", str);
    return str;
  } catch (error) {
    //if there is no file, use the default connection string
    const defaultConn = "mongodb://root:tiger@127.0.0.1:27017/nodejsapi?authSource=admin";
    console.log("Using default connection string", defaultConn);
    return defaultConn;
  }
}

export default connect;
