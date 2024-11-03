const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = new mongoose.Schema({
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  product: { type: mongoose.Types.ObjectId, ref: "Product" },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now() },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

reviewSchema.statics.calcAverageRating = async function (productId) {
  const { nRating, avgRating } = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (nRating) Product.findByIdAndUpdate(productId, { nRating, avgRating });
  else Product.findByIdAndUpdate(productId, { nRating: 0, avgRating: 0 });
};

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "fullName" });
  next();
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRating(this.r._id);
});
