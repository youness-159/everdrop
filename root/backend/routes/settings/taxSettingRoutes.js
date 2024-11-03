const express = require("express");
const taxController = require("../../controllers/settings/taxSettingController");

const taxSettingRouter = express.Router();

taxSettingRouter
  .route("/")
  .get(taxController.getAllTaxes)
  .post(taxController.createTax);

taxSettingRouter
  .route("/:id")
  .get(taxController.getTaxById)
  .patch(taxController.updateTaxById)
  .delete(taxController.deleteTaxById);

module.exports = taxSettingRouter;
