const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Product = require("./productModel");
const AppError = require("../utils/AppError");

const orderSchema = new mongoose.Schema({
  products: { type: mongoose.Schema.Types.Array, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, required: true },
  orderNumber: { type: Number },
  shipmentStatus: { type: String },
  orderStatus: { type: String, default: "pending" },
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

orderSchema.plugin(AutoIncrement, { inc_field: "orderNumber" });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

orderSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "fullName email" }).populate("product");

  next();
});

orderSchema.post("save", async function (next) {
  await Promise.all(
    this.products.map(async (productId) => {
      const product = await Product.findById(productId);
      if (!product)
        return next(new AppError("cannot find ordered product", 404));
      ++product.sales;
      product.save();
    }),
  );
});
