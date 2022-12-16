import http from "http";
import app from "./app.js";
import connect from "./db/connection.js";

const port = process.env.PORT || 3000;
const hostAddress = "0.0.0.0";

async function start() {
  // connect to db
  await connect().catch((err) => console.log(err));


  // start server
  const port = process.env.PORT || 3000;
  const server = http.createServer(app);

  server.listen(port, hostAddress, () => {
    var addr = server.address();
    console.log(`Server is running on ${addr.address}:${addr.port}`);
  });
}

start();
