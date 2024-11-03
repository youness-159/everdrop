const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

require("./connectDB");

const PORT = process.env.PORT || 8000;
const URL = process.env.URL || "0.0.0.0";

const server = app.listen(PORT, () => {
  console.log(`app listening at http://${URL}:${PORT}`);
});
