import express from "express";
import orderModel from "../models/order.js";

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
  const order = new orderModel(req.body);
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
  const orders = await orderModel.find({ user: req.params.userid });
  res.send(orders);
});

export default router;
