import path from "path";
import express from "express";
import productModel from "../models/product.js";
import shortid from "shortid";
import { staticPath } from "../config.js";

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the get route
router.get("/", async (req, res) => {
  // send product
  const products = await productModel.find({});
  res.send(products);
});

// get product by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productModel.findById(id);
    res.send(product);
  } catch (err) {
    res.status(404).send({ message: "Product Not Found." });
  }
});

// delete by id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (deletedProduct) {
      res.send({ message: "Product Deleted" });
    }else{
      res.status(404).send({ message: "Product Not Found." });
    }
  } catch (err) {
    res.status(404).send({ message: "Product Not Found." });
  }
});

// create product
router.post("/", (req, res) => {
  const data = req.body;

  // extract image from form data
  const image = req.files.image;
  const ext = image.name.split(".").pop();
  const filename = `image/${shortid.generate() + "." + ext}`;
  const imagePath = path.join(staticPath, filename);

  // save image to disk
  image.mv(imagePath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });

  data.image = filename;

  const product = new productModel(data);
  product.save((err, product) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).send(product);
    }
  });
});

// update product
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  let newFileName = null;

  // extract image from form data
  if (req.files) {
    const image = req.files.image;
    const ext = image.name.split(".").pop();
    const filename = `image/${shortid.generate() + "." + ext}`;
    const imagePath = path.join(staticPath, filename);

    // save image to disk
    image.mv(imagePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });

    newFileName = filename;
  }

  try {
    const product = await productModel.findById(id);
    if (product) {
      product.title = data.title;
      product.price = data.price;
      product.description = data.description;
      product.shippingCost = data.shippingCost;
      if (newFileName) {
        product.image = newFileName;
      }
      const updatedProduct = await product.save();
      res.send(updatedProduct);
    } else {
      res.status(404).send({ message: "Product Not Found." });
    }
  } catch (err) {
    res.status(404).send({ message: "Product Not Found." });
  }
});

export default router;
