const factory = require("./handlerFactory");
const Coupon = require("../models/couponModel.js");
const User = require("../models/userModel.js");
const catchAsync = require("../utils/catchAsync");
const { isEmptyObject } = require("../utils/functions");
const AppError = require("../utils/AppError");

exports.applyCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findOne({ code: req.body.code });
  if (!coupon) return next(new AppError("Coupon Not Found !!", 404));

  let couponProducts = req.user.cartItems.filter((item) =>
    coupon.products.includes(item._id),
  );

  couponProducts.forEach((product) =>
    coupon.discountType === "percentage"
      ? (product.price -= product.price * (+coupon.discountAmount / 100))
      : (product.price -= coupon.discountAmount),
  );

  const loggedUser = await User.findByIdAndUpdate(req.user._id, {
    cart: req.user.cartItems,
  });

  if (!loggedUser) return next(new AppError("Coupon Not Applied !!", 400));

  coupon.usedCount++;
  await coupon.save();

  res.status(200).json({ status: "success", data: null });
});

exports.getCouponsLength = factory.getLengthOf(Coupon);
exports.getAllCoupons = factory.getAll(Coupon);
exports.getCouponById = factory.getOneById(Coupon);
exports.createCoupon = factory.createOne(Coupon);
exports.updateCouponById = factory.updateOneById(Coupon);
exports.deleteCouponById = factory.deleteOneById(Coupon);
