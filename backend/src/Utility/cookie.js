const clearAndMakeCookie = (res, cookieName, token) => {
  return new Promise((resolve, reject) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    try {
      console.log("before clearing the cookie=======================1");
      res.clearCookie(cookieName, {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        signed: true,
      });
      console.log("after clearing the cookie=======================2");
      console.log("before setting the cookie=======================3");
      res.cookie(process.env.COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires: expires,
        httpOnly: true,
        signed: true,
      });
      console.log("after setting the cookie=======================2");
      resolve();
    } catch (e) {
      reject();
      console.log(e);
    }
  });
};

module.exports = { clearAndMakeCookie };
