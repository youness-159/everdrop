const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  urlKey: String,
  metaTitle: String,
  metaKeywords: [String],
  metaDescription: String,
  image: String,
  status: { type: Boolean, default: false },
  inStartMenu: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
