const setCookie = async (req, res) => {
  const maxAge = 1000 * 60 * 60 * 24 * 7;
  const message = "Cookie set successfully!";
  res.cookie("user_id", { maxAge, signed: true }).json200(message);
};

const readCookie = (req, res, next) => {
  const signedCookie = req.signedCookies.user_id;
  const message = "Cookies read success!";
  if (!cookie) {
    return res.json404({ message: "Cookie not found" });
  }
  res.json200({ cookie, signedCookie, message });
};

const clearCookie = (req, res, next) => {
  const message = "Cookies cleared success!";
  if (!cookie) {
    return res.json404({ message: "Cookie not found" });
  }
  res.clearCookie("user_id").json200({ message });
};

export { setCookie, readCookie, clearCookie };
