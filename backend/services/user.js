import express from "express";
import userModel from "../models/user.js";

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the get route
router.get("/", async (req, res) => {
  // send product
  const users = await userModel.find({});
  res.send(users);
});

// get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    res.send(user);
  } catch (err) {
    res.status(404).send({ message: "user Not found." });
  }
});

// delete by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (deletedUser) {
      res.send({ message: "user Deleted" });
    }else{
      res.status(404).send({ message: "user Not Found." });
    }
  } catch (err) {
    res.status(404).send({ message: "user Not Found." });
  }
});

// create product
router.post("/", (req, res) => {
    const data = req.body;
  
    const user = new userModel(data);
    user.save((err, user) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(201).send(user);
      }
    });
  });



// update product
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const user = await userModel.findById(id);
    if (user) {
      user.name = data.name;
      user.email = data.email;
      user.password = data.password;
      user.shippingAddress = data.shippingAddress;
      
      const updatedUser = await user.save();
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: "User Not Found." });
    }
  } catch (err) {
    res.status(404).send({ message: "User Not Found." });
  }
});

export default router;
