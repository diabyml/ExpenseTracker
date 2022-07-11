const express = require("express");
const transactionRoute = require("../routes/transaction/transaction.route");
const { isAuthenticated } = require("../routes/user/user.controller");
const userRoute = require("../routes/user/user.route");

const v1Router = express.Router();

v1Router.use("/users", userRoute);
v1Router.use("/transactions", isAuthenticated, transactionRoute);

module.exports = { v1Router };
