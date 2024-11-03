const mongoose = require("mongoose");

const paymentSettingSchema = new mongoose.Schema({
  enable: { type: Boolean, default: true },
  name: { type: String, required: true },
  publishableKey: { type: String, required: true },
  secretKey: { type: String, required: true },
  webhookSecretKey: { type: String, required: true },
});

const PaymentSetting =
  mongoose.models.PaymentSetting ||
  mongoose.model("PaymentSetting", paymentSettingSchema);

module.exports = PaymentSetting;
