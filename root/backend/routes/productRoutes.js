const express = require("express");
const productRouter = express.Router();

const productController = require("../controllers/productController");
const { protect, restrictTo } = require("../controllers/authController");

productRouter.route("/").get(productController.getAllProducts);

productRouter.route("/filters").get(productController.getFilters);
productRouter.route("/length").get(productController.getProductsLength);

productRouter.route("/:id").get(productController.getProductById);

productRouter.use(protect);
productRouter.use(restrictTo("admin"));

productRouter.route("/").post(productController.createProduct);

productRouter
  .route("/:id")
  .patch(
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.updateProductById,
  )
  .delete(productController.deleteProductById);

module.exports = productRouter;
