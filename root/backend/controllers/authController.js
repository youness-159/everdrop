const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const Email = require("../utils/Email");

// const { isEmptyObject, createSendToken} = require("../utils/functions");

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 365 * 24 * 60 * 60 * 1000,
  });
}

function createSendToken(user, status, req, res) {
  const token = createToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  user.password = undefined;

  res.status(status).json({ status: "success", data: { token, user } });
}

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers?.authorization?.startsWith("Bearer"))
    token = req.headers.authorization.split(" ")[1];
  else if (req?.cookie?.jwt) token = req.cookie.jwt;

  if (!token)
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY,
  );
  const user = await User.findById(decoded.id).select("+role");
  if (!user) return next(new AppError("user not exist !!", 400));
  if (user.passwordChangedAt && user.passwordChangedAt > decoded.iat)
    return next(
      new AppError(
        "password has changed please re-login with the new password",
      ),
    );

  req.user = user;
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(
          "you do not have permission to perform this action !!",
          403,
        ),
      );
    return next();
  };

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Please provide email and password!", 400));

  const user = await User.findOne({ email }).select("+password");
  const isCorrectPassword = await user.correctPassword(password, user.password);

  if (!user || !isCorrectPassword)
    return next(new AppError("Incorrect email or password", 401));

  if (!user.active)
    return next(new AppError("Please confirm your account", 401));

  createSendToken(user, 200, req, res);
});

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, fullName } = req.body;
  if (password !== passwordConfirm)
    return next(new AppError("passwordConfirm do not match password !", 400));


  const verificationCode = Math.floor(Math.random() * 999_999);
  const verificationCodeExpires = Date.now() + 5 * 60 * 1000;
  const user = await User.create({
    email,
    password,
    fullName,
    verificationCode,
    verificationCodeExpires,
  });

  if (!user) return next(new AppError("user creation failed !!", 400));

  await new Email(user).sendEmailVerificationCode(verificationCode);

  createSendToken(user, 200, req, res);
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { email, verificationCode } = req.body;
  const user = await User.findOne({ email, verificationCode });

  if (!user) return next(new AppError("incorrect code or email !!", 400));
  if (Date.now() > user.verificationCodeExpires)
    return next(
      new AppError("activation code has expired. Please try again !!"),
    );

  user.verificationCode = undefined;
  user.verificationCodeExpires = undefined;
  user.active = true;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ status: "success" });
});

function createResetPasswordToken(user) {
  const randomNumber = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(randomNumber)
    .digest("hex");

  user.passwordResetTokenExpires = Date.now() + 15 * 60 * 1000;
  return user.passwordResetToken;
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return next(new AppError("account with this email not found", 404));

  const token = createResetPasswordToken(user);
  await user.save({ validateBeforeSave: false });

  const url = `${process.env.FRONTEND_URL}/account/reset-password?token=${token}`;

  await new Email(user, url).send(
    `reset password url: ${url} .reset token will be expired by 15min`,
    "password reset",
  );

  res.status(200).json({
    status: "success",
    data: "reset password url has sent to your email",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.body;
  const user = await User.findOne({ passwordResetToken: token });
  if (!user) return next(new AppError("invalid token !!", 404));
  if (Date.now() > user.passwordResetTokenExpires)
    return next("token  expired !!", 400);

  if (password !== passwordConfirm)
    return next(new AppError("passwordConfirm fo not match password", 400));

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Math.floor(new Date().getTime() / 1000);

  await user.save({ validateBeforeSave: false });
  res.status(200).json({ resetPassword: true });
});
