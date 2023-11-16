const express = require("express");
const {
  loginUser,
  signUpUser,
  verifyUser,
  googleLogin,
  logout,
} = require("../controller/UserController");
const { verifyToken } = require("../Middleware/verifyToken");
const userRouter = express.Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/sign-up").post(signUpUser);
userRouter.route("/google-auth").post(googleLogin);
userRouter.route("/logout").get(logout);
userRouter.route("/auth-status").get(verifyToken, verifyUser);

module.exports = userRouter;
