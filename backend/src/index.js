const express = require("express");
const cookieParser = require("cookie-parser");
const appRouter = require("./routes/index");
const errorHandlerMiddleWare = require("./Middleware/errorHandler");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);
app.use(errorHandlerMiddleWare);

app.listen(process.env.PORT, () => {
  console.log("running on port 8080");
});
