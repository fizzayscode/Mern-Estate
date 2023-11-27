const express = require("express");
const appRouter = express.Router();

const userRouter = require("./userRouter");
const listingRouter = require("./listingRouter");

appRouter.use("/users", userRouter);
appRouter.use("/listing", listingRouter);

module.exports = appRouter;
