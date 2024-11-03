const mongoose = require("mongoose");

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
  sales: Number,
  urlKey: { type: String, trim: true },
  metaTitle: { type: String, trim: true },
  metaKeywords: [{ type: String, trim: true }],
  metaDescription: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now() },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
