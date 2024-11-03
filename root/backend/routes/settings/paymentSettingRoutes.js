const express = require("express");
const paymentSettingController = require("../../controllers/settings/paymentSettingController");

const paymentSettingRouter = express.Router();

paymentSettingRouter
  .route("/")
  .get(paymentSettingController.getAllPaymentSettings)
  .post(paymentSettingController.createPaymentSetting);

paymentSettingRouter
  .route("/:id")
  .get(paymentSettingController.getPaymentSettingById)
  .patch(paymentSettingController.updatePaymentSettingById)
  .delete(paymentSettingController.deletePaymentSettingById);

module.exports = paymentSettingRouter;
