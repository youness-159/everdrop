const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");
const {
  protect,
  restrictTo,
  login,
  signup,
  resetPassword,
  forgotPassword,
  verifyEmail,
} = require("../controllers/authController");

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/forgot-password", forgotPassword);
userRouter.patch("/reset-password/:token", resetPassword);

userRouter.use(protect);

userRouter.get("/my-info", userController.myInfo);
userRouter.get("/length", userController.getUsersLength);
userRouter.patch("/update-logged-user", userController.updateLoggedUser);

userRouter.use(restrictTo("admin"));

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

userRouter
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = userRouter;
