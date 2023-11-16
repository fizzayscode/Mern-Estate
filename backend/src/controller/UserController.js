const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const errorHandler = require("../Utility/customErrorHandler");
const {
  encryptPassword,
  generateSignature,
  checkPassword,
} = require("../Utility/passwordUtils");

const signUpUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  if (
    !email ||
    !username ||
    !password ||
    email.trim() == "" ||
    username.trim() == "" ||
    password.trim() == ""
  ) {
    next(errorHandler(404, "provide name email and password"));
  }
  const exisitingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (exisitingUser) {
    next(errorHandler(400, "user with email already exists"));
  }
  try {
    const encryptedPassword = await encryptPassword(password);
    console.log(encryptedPassword);
    const user = await prisma.user.create({
      data: { username, email, password: encryptedPassword },
    });
    res.clearCookie(process.env.COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // i want to store the cookie in the root director
    // rememember to chnage the domain after hosting your application

    const token = generateSignature({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    res.cookie(process.env.COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires: expires,
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    console.log(user);
    // removing the password before sending remainign to the frontend
    const { password: remPassword, ...rest } = user;
    return res.status(201).json({
      message: "USER CREATED",
      user: rest,
    });
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || password.trim() == "" || email.trim == "") {
    next(errorHandler(404, "you must provide email or password"));
  }

  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    return next(
      errorHandler(404, "wrong email or password please check and try again")
    );
  }

  const correctPassword = await checkPassword(password, user.password);

  if (correctPassword) {
    const token = generateSignature({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    console.log(token);
    res.clearCookie(process.env.COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // i want to store the cookie in the root director
    // rememember to chnage the domain after hosting your application

    res.cookie(process.env.COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires: expires,
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    const { password: password, ...rest } = user;

    return res.status(200).json({
      message: "LOGGED IN SUCCESSFULLY",
      user: rest,
    });
  } else {
    next(
      errorHandler(404, "wrong email or password please check and try again")
    );
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: res.locals.jwtData.id },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found or token malfunctioned" });
    }

    const { password: password, ...rest } = user;
    console.log(rest);
    res.status(200).json({ message: "user Found", user: rest });
  } catch (e) {
    // console.error("Error verifying user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const googleLogin = async (req, res, next) => {
  const { email, avatar } = req.body;
  if (!email) {
    return next(errorHandler(404, "you must provide email "));
  }
  // try {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    const generateRandomPassword = (length) =>
      Array.from(
        { length },
        () =>
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[
            Math.floor(Math.random() * 62)
          ]
      ).join("");
    const randompassword = generateRandomPassword(12);
    const hashedPassword = await encryptPassword(randompassword);

    const username = email.split("@")[0];

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        avatar: avatar,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.clearCookie(process.env.COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // i want to store the cookie in the root director
    // rememember to chnage the domain after hosting your application
    const token = generateSignature({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });

    res.cookie(process.env.COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires: expires,
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    const { password: password, ...rest } = newUser;
    return res.status(201).json({ message: "user created", user: rest });
  } else {
    res.clearCookie(process.env.COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    // i want to store the cookie in the root director
    // rememember to chnage the domain after hosting your application
    const token = generateSignature({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    res.cookie(process.env.COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires: expires,
      httpOnly: true,
      // encrypt thr cookie in a signed format
      signed: true,
    });
    const { password: password, ...rest } = user;
    return res.status(200).json({ message: "logged in", user: rest });
  }
  // } catch (e) {
  //   return next(errorHandler(500, "internal server error"));
  // }
};

module.exports = { loginUser, signUpUser, verifyUser, googleLogin };
