const { getMonthlyNewUsers } = require("../controllers/statisticController");
const statisticRouter = require("express").Router();

statisticRouter.get("/monthly-new-users", getMonthlyNewUsers);

module.exports = statisticRouter;
