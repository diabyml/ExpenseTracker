const express = require("express");
const { httpSignUp, httpLogin } = require("./user.controller");

const userRoute = express.Router();

userRoute.post("/auth/signup", httpSignUp);
userRoute.post("/auth/login", httpLogin);

module.exports = userRoute;
