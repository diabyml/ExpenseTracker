const express = require("express");
const userRoute = require("../routes/user/user.route");

const v1Router = express.Router();

v1Router.use("/users", userRoute);

module.exports = { v1Router };
