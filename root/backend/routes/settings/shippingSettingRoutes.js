const express = require("express");
const shippingSettingController = require("../../controllers/settings/shippingSettingController");

const shippingSettingRouter = express.Router();

shippingSettingRouter
  .route("/")
  .get(shippingSettingController.getAllShippingSettings)
  .post(shippingSettingController.createShippingSetting);

shippingSettingRouter
  .route("/:id")
  .get(shippingSettingController.getShippingSettingById)
  .patch(shippingSettingController.updateShippingSettingById)
  .delete(shippingSettingController.deleteShippingSettingById);

module.exports = shippingSettingRouter;
