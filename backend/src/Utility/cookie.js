const clearAndMakeCookie = (res, cookieName, token) => {
  return new Promise((resolve, reject) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    try {
      res.clearCookie(cookieName, {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        signed: true,
      });
      res.cookie(process.env.COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires: expires,
        httpOnly: true,
        signed: true,
      });
      resolve();
    } catch (e) {
      reject();
      console.log(e);
    }
  });
};

module.exports = { clearAndMakeCookie };
