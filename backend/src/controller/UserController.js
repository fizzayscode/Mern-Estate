const signUpUser = async (req, res) => {
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
      data: { name, email, password: encryptedPassword },
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
      name: user.name,
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
    return res
      .status(201)
      .json({ message: "USER CREATED", name: user.name, email: user.email });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
const loginUser = (req, res, next) => {};

module.exports = { loginUser, signUpUser };
