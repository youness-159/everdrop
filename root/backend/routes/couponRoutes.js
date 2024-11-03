const express = require("express");
const couponRouter = express.Router();

const couponController = require("../controllers/couponController");
const { protect, restrictTo } = require("../controllers/authController");

couponRouter.use(protect);

couponRouter.patch("/apply-coupon", couponController.applyCoupon);

couponRouter.use(restrictTo("admin"));

couponRouter.route("/").get(couponController.getAllCoupons);
couponRouter.route("/length").get(couponController.getCouponsLength);

couponRouter.route("/").post(couponController.createCoupon);

couponRouter.route("/:id").get(couponController.getCouponById);

couponRouter
  .route("/:id")
  .patch(couponController.updateCouponById)
  .delete(couponController.deleteCouponById);

module.exports = couponRouter;
