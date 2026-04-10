const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    throw next();
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesecretkey");
  } catch (err) {
    req.isAuth = false;
    throw next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    throw next();
  }
  req.userId = decodedToken.userId;
  req.isAuth = true;
  next();
};
