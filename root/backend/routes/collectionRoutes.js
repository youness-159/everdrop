const express = require("express");
const collectionRouter = express.Router();

const collectionController = require("../controllers/collectionController");
const { protect, restrictTo } = require("../controllers/authController");

collectionRouter.route("/").get(collectionController.getAllCollections);

collectionRouter.route("/:id").get(collectionController.getCollectionById);

collectionRouter.use(protect);
collectionRouter.use(restrictTo("admin"));

collectionRouter.route("/").post(collectionController.createCollection);

collectionRouter
  .route("/:id")
  .patch(collectionController.updateCollectionById)
  .delete(collectionController.deleteCollectionById);

module.exports = collectionRouter;
