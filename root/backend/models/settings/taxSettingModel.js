const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  country: { type: String, required: true },
  region: { type: String },
  type: { type: String, default: "percentage" },
  isActive: { type: Boolean, default: true },
  description: { type: String },
});

const TaxSetting = mongoose.model("Tax", taxSchema);

module.exports = TaxSetting;
