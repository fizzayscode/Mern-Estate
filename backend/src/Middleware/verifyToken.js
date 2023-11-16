const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.signedCookies[`${process.env.COOKIE_NAME}`];
  console.log(token);
  if (!token || token.trim == "") {
    throw new Error("no token provided");
  }
  return new Promise((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "token Expired" });
      } else {
        console.log("token verification successfull");
        resolve();
        // the success conatins all my payload data here
        res.locals.jwtData = success;
        // console.log(success);
        return next();
      }
    });
  });
};
module.exports = { verifyToken };
