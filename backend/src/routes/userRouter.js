const express = require("express");
const {
  loginUser,
  signUpUser,
  verifyUser,
  googleLogin,
  logout,
  updateUser,
  createListing,
} = require("../controller/UserController");
const { verifyToken } = require("../Middleware/verifyToken");
const userRouter = express.Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/sign-up").post(signUpUser);
userRouter.route("/google-auth").post(googleLogin);
userRouter.route("/logout").get(logout);
userRouter.route("/auth-status").get(verifyToken, verifyUser);
userRouter.route("/update/:id").patch(verifyToken, updateUser);
userRouter.route("/create-listing").post(verifyToken, createListing);

module.exports = userRouter;
