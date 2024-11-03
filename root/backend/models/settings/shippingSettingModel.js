const mongoose = require("mongoose");

const shippingSettingSchema = new mongoose.Schema({
  country: { type: String, required: true },
  method: { type: String, required: true },
  status: { type: Boolean, default: true },
  cost: { type: Number, required: true },
  condition: { type: String, default: "None" },
});

const ShippingSetting = mongoose.model("PaymentSetting", shippingSettingSchema);

module.exports = ShippingSetting;
