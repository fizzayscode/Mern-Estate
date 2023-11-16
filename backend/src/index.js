const express = require("express");
const cookieParser = require("cookie-parser");
const appRouter = require("./routes/index");
const cors = require("cors");
const errorHandlerMiddleWare = require("./Middleware/errorHandler");
require("dotenv").config();

const app = express();
app.use(express.json());
const allowedOrigin = "http://localhost:5173";
const corsOptions = {
  origin: function (origin, callback) {
    if (origin === allowedOrigin || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);
app.use(errorHandlerMiddleWare);

app.listen(process.env.PORT, () => {
  console.log("running on port 8080");
});
