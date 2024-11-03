const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: { type: String, required: true, select: false },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  passwordChangedAt: Date,
  verificationCode: Number,
  verificationCodeExpires: Date,
  photo: String,
  active: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword,
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

userSchema.methods.createResetPasswordToken = function () {
  const randomNumber = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(randomNumber)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 15 * 60 * 1000;
  console.log(
    "reset token",
    this.passwordResetToken,
    this.passwordResetTokenExpires,
  );
  return this.passwordResetToken;
};
