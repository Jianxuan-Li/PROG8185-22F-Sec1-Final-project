import express from "express";
import cartModel from "../models/cart.js";

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the get route
router.get("/", async (req, res) => {
  // send product
  const users = await cartModel.find({});
  res.send(users);
});


// get all carts of a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const carts = await cartModel.find
    ({ user: userId });
  res.send(carts);
});



router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await cartModel.findById(id);
    res.send(user);
  } catch (err) {
    res.status(404).send({ message: "cart Not found." });
  }
});

// delete by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const c = await cartModel.findByIdAndDelete(id);
    if (c) {
      res.send({ message: "cart Deleted" });
    } else {
      res.status(404).send({ message: "cart Not Found." });
    }
  } catch (err) {
    res.status(404).send({ message: "cart Not Found." });
  }
});

// create cart item
router.post("/", (req, res) => {
  const data = req.body;

  const cart = new cartModel(data);
  cart.save((err, user) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).send(user);
    }
  });
});



// update cart
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const cart = await cartModel.findById(id);
    if (cart) {
      cart = data
      const updatedcart = await cart.save();
      res.send(updatedcart);
    } else {
      res.status(404).send({ message: "cart Not Found." });
    }
  } catch (err) {
    res.status(404).send({ message: "cart Not Found." });
  }
});

export default router;
