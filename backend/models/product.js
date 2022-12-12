import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: mongoose.Decimal128,
  shippingCost: mongoose.Decimal128,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
