const factory = require("./handlerFactory");
const User = require("../models/userModel.js");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/AppError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { isEmptyObject } = require("../utils/functions");
const Product = require("../models/productModel");

exports.updateLoggedUser = catchAsync(async (req, res, next) => {
  function sanitizate(body) {
    const sanitizations = ["password", "createdAt", "role"];
    sanitizations.forEach((el) => body[el] && delete body[el]);
    return body;
  }

  const loggedUser = await User.findByIdAndUpdate(
    req.user._id,
    sanitizate(req.body),
  );
  if (!loggedUser) return next(new AppError("updating failed !", 400));

  res.status(200).json({ status: "success", data: loggedUser });
});

exports.myInfo = catchAsync(async (req, res) => {
  res.status(200).json({ status: "success", data: req.user });
});

exports.getUsersLength = factory.getLengthOf(User);
exports.getAllUsers = factory.getAll(User);
exports.getUserById = factory.getOneById(User);
exports.createUser = factory.createOne(User);
exports.updateUserById = factory.updateOneById(User);
exports.deleteUserById = factory.deleteOneById(User);
