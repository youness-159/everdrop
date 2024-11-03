const express = require("express");
const orderRouter = express.Router();

const orderController = require("../controllers/orderController");
const { protect, restrictTo } = require("../controllers/authController");

orderRouter.use(protect);

orderRouter
  .route("/checkout-session")
  .get(orderController.createOrderCheckout, orderController.getCheckoutSession);

orderRouter.get("/my-orders", orderController.getMyOrders);

orderRouter.use(restrictTo("admin"));

orderRouter.route("/").get(orderController.getAllOrders);
orderRouter.route("/length").get(orderController.getOrdersLength);
orderRouter.route("/salesPerWeek").get(orderController.getSalesPerWeek);
orderRouter.route("/salesPerDay").get(orderController.getSalesPerDay);
orderRouter.route("/salesPerMonth").get(orderController.getSalesPerMonth);
orderRouter.route("/sales").get(orderController.getTotalSales);

orderRouter.route("/:id").get(orderController.getOrderById);

orderRouter.route("/").post(orderController.createOrder);

orderRouter
  .route("/:id")
  .patch(orderController.updateOrderById)
  .delete(orderController.deleteOrderById);

module.exports = orderRouter;
