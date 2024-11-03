const cartRouter = require("express").Router();
const cartController = require("../controllers/cartController");
const { protect } = require("../controllers/authController");

cartRouter
  .route("/")
  .get(cartController.getAllCart)
  .post(cartController.createOneCart);

cartRouter
  .route("/:id")
  .patch(cartController.updateOneCart)
  .delete(cartController.deleteOneCart);

cartRouter.use(protect);

cartRouter.route("/my-cart").get(cartController.getMyCart);

module.exports = cartRouter;
