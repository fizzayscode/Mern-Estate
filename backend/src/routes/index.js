const express = require("express");
const appRouter = express.Router();

const userRouter = require("./userRouter");

appRouter.use("/user", userRouter);

module.exports = appRouter;
