const express = require("express");
const cookieParser = require("cookie-parser");
const appRouter = require("./routes/index");
const path = require("path");
const cors = require("cors");
const errorHandlerMiddleWare = require("./Middleware/errorHandler");
require("dotenv").config();
const dirname = path.resolve();
const app = express();
app.use(express.json());
const allowedOrigin = [
  "https://fizzays-mern-estae.onrender.com",
  "http://localhost:5173",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.static(path.join(dirname, "/frontend/dist")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/v1", appRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(dirname, "frontend", "dist", "index.html"));
});
app.use(errorHandlerMiddleWare);

// any file i go to that is not api/v1/ it should send this html file
app.listen(process.env.PORT, () => {
  console.log("running on port 8080");
});
