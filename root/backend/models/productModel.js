const fs = require("fs");
const mongoose = require("mongoose");

const Cart = require("./cartModel");
const AppError = require("../utils/AppError");

const productSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  price: { type: Number, required: true },
  coverImage: String,
  images: [String],
  discount: { type: Number, default: 0 },
  sku: { type: String, trim: true },
  weight: { type: Number, min: 0 },
  sizes: [{ type: String, trim: true }],
  colors: [{ type: String, trim: true }],
  brand: { type: String, trim: true },
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
  status: { type: Boolean, default: false },
  visibility: { type: Boolean, default: false },
  inStock: { type: Boolean, default: false },
  availability: { type: Boolean, default: false },
  quantity: { type: Number, min: 0 },
  sales: { type: Number, default: 0 },
  urlKey: { type: String, trim: true },
  metaTitle: { type: String, trim: true },
  metaKeywords: [{ type: String, trim: true }],
  metaDescription: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now() },
});

productSchema.pre("findOneAndDelete", async function (next) {
  try {
    await Cart.deleteMany({ product: this.getQuery()._id });

    const product = await Product.findById(this.getQuery()._id); // fs.unlink(`../public/imgs/products/${ge}.json`);
    if (!product) next();

    fs.unlink(`./public/imgs/products/${product.coverImage}`, (err) => {
      console.log(err);
    });

    next();
  } catch (err) {
    next(new AppError("Error while deleting cart"));
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
