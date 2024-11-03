const factory = require("./handlerFactory");
const Cart = require("../models/cartModel");
const catchAsync = require("../utils/catchAsync");
const { isEmptyObject } = require("../utils/functions");
const AppError = require("../utils/AppError");

exports.getMyCart = catchAsync(async (req, res, next) => {
  const myCart = await Cart.find({ user: req.user._id }).populate({
    path: "product",
    select: "price coverImage name",
  });
  if (!myCart) return next(new AppError("something went wrong !", 404));

  res.status(200).json({ status: "success", data: myCart });
});

exports.getAllCart = factory.getAll(Cart);
exports.getOneCart = factory.getOneById(Cart);
exports.updateOneCart = factory.updateOneById(Cart);
exports.createOneCart = factory.createOne(Cart);
exports.deleteOneCart = factory.deleteOneById(Cart);
