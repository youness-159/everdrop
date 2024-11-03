const mongoose = require("mongoose");

const storeSettingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  phoneNumber: String,
  email: String,
  country: String,
  address: String,
  city: String,
  province: String,
  postalCode: String,
});

const StoreSetting = mongoose.model("StoreSetting", storeSettingSchema);

module.exports = StoreSetting;
