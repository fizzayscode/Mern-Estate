const express = require("express");
const { loginUser, signUpUser } = require("../controller/UserController");
const userRouter = express.Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/login").post(signUpUser);

module.exports = userRouter;
