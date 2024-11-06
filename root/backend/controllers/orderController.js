const factory = require("./handlerFactory");
const Order = require("../models/orderModel.js");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Cart = require("../models/cartModel");

const Stripe = require("stripe");
const req = require("express/lib/request");
const Product = require("../models/productModel");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function UpdateOrderDeleteCart(session, userId) {
  await updateOrderAfterSuccessCheckout(session);
  await Cart.deleteMany({ user: userId });
}

async function updateOrderAfterSuccessCheckout(session) {
  const orderId = session.client_reference_id;
  await Order.findByIdAndUpdate(orderId, { paid: true });
}

function getTotalPrice(carts) {
  let totalPrice = 0;

  carts.forEach((cart) => {
    totalPrice += cart.product.price * cart.quantity;
  });
  return totalPrice;
}

exports.createOrderCheckout = catchAsync(async (req, res, next) => {
  const carts = await Cart.find({ user: req.user._id }).populate({
    path: "product",
    select: "_id name price coverImage",
  });
  if (!carts) return next(new AppError("No Cart found!", 404));

  const newOrder = {
    products: carts.map((cart) => ({
      _id: cart.product._id,
      color: cart.productColor,
      size: cart.productSize,
      quantity: cart.quantity,
      coverImage: cart.product.coverImage,
    })),
    user: req.user._id,
    price: getTotalPrice(carts).toFixed(2),
  };

  const orderId = await Order.create(newOrder);
  if (!orderId) return next(new AppError("order creation failed !!", 500));
  req.orderId = orderId._id.toString()
  req.carts = carts;
  next();
});

const getCheckoutLineItems = (req) => {
  return req.carts.map((cart) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: cart.product.name,
        description: cart.product.description,
        images: [
          `${req.protocol}://${req.get("host")}/imgs/products/${cart.product.coverImage}`,
        ],
      },
      unit_amount: Math.ceil(cart.product.price * 100),
    },
    quantity: cart.quantity,
  }));
};


exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const line_items = await getCheckoutLineItems(req);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${process.env.FRONTEND_URL}/payment-checkout?status=success`,
    cancel_url: `${process.env.FRONTEND_URL}/payment-checkout?status=fail`,
    customer_email: req.user.email,
    client_reference_id: req.orderId,

    line_items,
  });

  res.status(200).json({ status: "success", data: session });
});

exports.webhookCheckout = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed")
    await UpdateOrderDeleteCart(event.data.object, req.user._id);

  res.status(200).json({ received: true });
};


exports.getMyOrders = catchAsync(async (req, res, next) => {
  const myOrders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  if (!myOrders) return next(new AppError("order not found", 404));

  res.status(200).json({ status: "success", data: myOrders });
});

exports.getSalesPerMonth = catchAsync(async (req, res, next) => {
  const stats = await Order.aggregate([
    { $match: { paid: false } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        sales: { $sum: 1 },
        total: { $sum: "$price" },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  if (!stats) return next(new AppError("no sales found !!", 404));

  res.status(200).json({ status: "success", data: stats });
});

exports.getSalesPerDay = catchAsync(async (req, res, next) => {
  const stats = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        sales: { $sum: 1 },
        total: { $sum: "$price" },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } },
    { $limit: 31 },
  ]);

  if (!stats) return next(new AppError("No sales found!", 404));

  res.status(200).json({ status: "success", data: stats });
});


exports.getTotalSales = catchAsync(async (req, res, next) => {
  const sales = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$price" },
      },
    },
  ]);

  if (!sales) return next(new AppError("no sales found !!", 404));
  res.status(200).json({ status: "success", data: sales });
});

exports.getOrdersLength = factory.getLengthOf(Order);
exports.getAllOrders = factory.getAll(Order, { path: "user", select: "email" });
exports.getOrderById = factory.getOneById(Order);
exports.createOrder = factory.createOne(Order);
exports.updateOrderById = factory.updateOneById(Order);
exports.deleteOrderById = factory.deleteOneById(Order);
