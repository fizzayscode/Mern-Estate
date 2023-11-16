const express = require("express");
const appRouter = express.Router();

const userRouter = require("./userRouter");

appRouter.use("/users", userRouter);

module.exports = appRouter;
