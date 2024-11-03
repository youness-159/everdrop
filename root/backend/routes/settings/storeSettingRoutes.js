const express = require("express");
const storeSettingController = require("../../controllers/settings/storeSettingController");

const storeSettingRouter = express.Router();

storeSettingRouter
  .route("/")
  .get(storeSettingController.getAllStoreSettings)
  .post(storeSettingController.createStoreSetting);

storeSettingRouter
  .route("/:id")
  .get(storeSettingController.getStoreSettingById)
  .patch(storeSettingController.updateStoreSettingById)
  .delete(storeSettingController.deleteStoreSettingById);

module.exports = storeSettingRouter;
