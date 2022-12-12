import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import notFound from "./middlewares/notfound.js";
import { staticPath } from "./config.js";

// Routers
import productApis from "./routers/product.js";
import userApis from "./routers/user.js";
import cartApis from "./routers/cart.js";
import commentApis from "./routers/comment.js";
import orderApis from "./routers/order.js";

// Create the express app
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static(staticPath));

const apiPrefix = "/api/v1";

// map routers to api prefix
app.use(apiPrefix + "/product", productApis);
app.use(apiPrefix + "/user", userApis);
app.use(apiPrefix + "/cart", cartApis);
app.use(apiPrefix + "/comment", commentApis);
app.use(apiPrefix + "/order", orderApis);

// for 404 routers
app.use(notFound);

export default app;
