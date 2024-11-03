const sessionsRouter = require("express").Router();
const axios = require("axios");
const qs = require("qs");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const User = require("../models/userModel");

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 365 * 24 * 60 * 60 * 1000,
  });
}

sessionsRouter.route("/oauth/google/user-data").get(async (req, res, next) => {
  const { code } = req.query;
  if (!code) return next(new AppError("Error: Code Not Found!", 404));

  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: process.env.PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    const userDataResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const { name, email, picture } = userDataResponse.data;

    let user = (await User.find({ email }))[0];
    console.log("user", user);
    if (!user)
      user = await User.create({
        fullName: name,
        email: email,
        photo: picture,
        password: "12345",
        active: true,
      });
    console.log("user2", user);

    if (!user) return next(new AppError("failed to create user!", 400));

    const token = createToken(user._id);

    res.redirect(`http://localhost:5173/login?token=${token}`);
  } catch (err) {
    console.log(err);
  }
  // res.status(200).json({ status: "success", data: userDataResponse.data });
});

module.exports = sessionsRouter;
