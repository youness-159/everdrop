const factory = require("./handlerFactory");
const Review = require("../models/reviewModel.js");

exports.getAllReviews = factory.getAll(Review);
exports.getReviewById = factory.getOneById(Review);
exports.createReview = factory.createOne(Review);
exports.updateReviewById = factory.updateOneById(Review);
exports.deleteReviewById = factory.deleteOneById(Review);
