const express = require("express");
const reviewRouter = express.Router();

const reviewController = require("../controllers/reviewController");
const { protect, restrictTo } = require("../controllers/authController");

reviewRouter.route("/").get(reviewController.getAllReviews);

reviewRouter.route("/:id").get(reviewController.getReviewById);

reviewRouter.use(protect);
reviewRouter.use(restrictTo("admin"));

reviewRouter.route("/").post(reviewController.createReview);

reviewRouter
  .route("/:id")
  .patch(reviewController.updateReviewById)
  .delete(reviewController.deleteReviewById);

module.exports = reviewRouter;
