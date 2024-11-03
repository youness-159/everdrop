const jwt = require("jsonwebtoken");

function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}" || JSON.stringify(obj) === "[]";
}

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

exports = { createSendToken, createToken, isEmptyObject };
