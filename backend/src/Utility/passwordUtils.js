const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const encryptPassword = async (password) => {
  const hash = 10;
  const newPassword = await bcrypt.hash(password, hash);
  return newPassword;
};

const generateSignature = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};
const checkPassword = async (passwordPassedIn, passwordInTheDB) => {
  return await bcrypt.compare(passwordPassedIn, passwordInTheDB);
};

module.exports = { encryptPassword, generateSignature, checkPassword };
