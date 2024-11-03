const express = require("express");
const categoryRouter = express.Router();

const categoryController = require("../controllers/categoryController");
const { protect, restrictTo } = require("../controllers/authController");

categoryRouter.route("/").get(categoryController.getAllCategories);

categoryRouter.route("/length").get(categoryController.getCategoriesLength);

categoryRouter.route("/:id").get(categoryController.getCategoryById);

categoryRouter.use(protect);
categoryRouter.use(restrictTo("admin"));

categoryRouter.route("/").post(categoryController.createCategory);

categoryRouter
  .route("/:id")
  .patch(categoryController.updateCategoryById)
  .delete(categoryController.deleteCategoryById);

module.exports = categoryRouter;
