const config = require("../config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Forbidden",
      });
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(`Server error in auth middleware, ${e.message}`);
    res.status(500).json({
      message: "Server error",
    });
  }
};
