const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
  products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  description: String,
  createdAt: { type: Date, default: Date.now() },
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
