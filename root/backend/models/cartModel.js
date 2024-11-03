const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  productColor: { type: String, required: true },
  productSize: { type: String, required: true },
  quantity: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
