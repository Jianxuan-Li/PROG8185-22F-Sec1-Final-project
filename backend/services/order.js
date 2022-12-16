import express from "express";
import orderModel from "../models/order.js";
import productModel from "../models/product.js";

const router = express.Router();

// define the get route
router.get("/", async (req, res) => {
  // send orders
  const orders = await orderModel.find({});
  res.send(orders);
});

// define the post route
router.post("/", async (req, res) => {
  // create order
  const { user, products } = req.body;

  const productsIds = products.map((item) => item._id);

  // find price in database
  const productsFromDb = await productModel.find({
    _id: { $in: productsIds },
  });

  // convert productsFromDb to object with id as key
  const productsFromDbObj = productsFromDb.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});
    
  const subtotal = parseFloat(parseFloat(products.reduce((acc, item) => {
    // get price from productsFromDbObj by id
    const price = productsFromDbObj[item._id].price;
    return acc + price * item.quantity;
  }, 0)).toFixed(2));

  const tax = parseFloat(parseFloat(subtotal * 0.13).toFixed(2));
  const total = parseFloat(parseFloat(subtotal + tax).toFixed(2));

  // populate products with product id and quantity
  products.forEach((item) => {
    item.product = item._id;
    delete item._id;
  });

  const orderData = {
    user,
    products,
    subtotal,
    tax,
    total,
    status: "pending",
  };

  const order = new orderModel(orderData);
  const result = await order.save();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  // send order
  const order = await orderModel.findById(req.params.id);
  res.send(order);
});

// get all orders for a user
router.get("/user/:userid", async (req, res) => {
  // send orders
  const orders = await orderModel.find({ user: req.params.userid }).populate('products.product');
  res.send(orders);
});

export default router;
