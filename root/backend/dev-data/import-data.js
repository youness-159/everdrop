const fs = require("fs");
const User = require("../models/productModel");

require("../connectDB");

const data = fs.readFileSync(__dirname + "/products.json", "utf8");

(async () => {
  await User.create(JSON.parse(data), { validateBeforeSave: false });
  console.log("data created successfully");
})();
