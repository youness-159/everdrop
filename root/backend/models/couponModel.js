const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  isForAll: Boolean,
  discountType: { type: String, required: true },
  discountAmount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  usedCount: { type: Number, default: 0 },
  useLimit: { type: Number, default: -1 },
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
