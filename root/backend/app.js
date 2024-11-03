const path = require("node:path");

const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const { urlencoded } = require("express");

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRoutes");
const collectionRouter = require("./routes/collectionRoutes");
const couponRouter = require("./routes/couponRoutes");
const sessionsRouter = require("./routes/sessionsRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const storeSettingRoutes = require("./routes/settings/storeSettingRoutes");
const shippingSettingRoutes = require("./routes/settings/shippingSettingRoutes");
// const paymentSettingRoutes = require("./routes/settings/paymentSettingRoutes");
const taxSettingRoutes = require("./routes/settings/taxSettingRoutes");

const orderController = require("./controllers/orderController");
const errorController = require("./controllers/errorController");

const AppError = require("./utils/AppError");
const orderRouter = require("./routes/orderRoutes");

const app = express();

app.enable("enable proxy");

app.use(cors());
app.options("*", cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());

if (process.env.NODE_ENV === "development") morgan("dev");

app.use(xss());

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 1000,
//   message: "Too many requests from this IP",
// });
//
// app.use("/", limiter);

app.post(
  "/webhook-checkout",
  bodyParser.raw({ type: "application/json" }),
  orderController.webhookCheckout,
);

app.use(express.json({ limit: "10kb" }));
app.use(urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());
app.use(
  hpp({
    whitelist: [],
  }),
);

app.use(compression());

app.use("/api/v1/sessions", sessionsRouter);
app.use("/api/v1/everdrop/products", productRouter);
app.use("/api/v1/everdrop/users", userRouter);
app.use("/api/v1/everdrop/carts", cartRouter);
app.use("/api/v1/everdrop/orders", orderRouter);
app.use("/api/v1/everdrop/collections", collectionRouter);
app.use("/api/v1/everdrop/coupons", couponRouter);
app.use("/api/v1/everdrop/reviews", reviewRouter);
app.use("/api/v1/everdrop/categories", categoryRouter);
// app.use("/api/v1/everdrop/payment-settings", paymentSettingRoutes);
app.use("/api/v1/everdrop/shipping-settings", shippingSettingRoutes);
app.use("/api/v1/everdrop/store-settings", storeSettingRoutes);
app.use("/api/v1/everdrop/taxes", taxSettingRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server !`, 404));
});

app.use(errorController);

module.exports = app;
