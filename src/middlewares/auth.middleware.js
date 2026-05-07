const jwt = require("jsonwebtoken");
const MESSAGES = require("../constants/messages");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "ERR",
        message: MESSAGES.AUTH.UNAUTHORIZED
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "ERR",
      message: MESSAGES.AUTH.UNAUTHORIZED
    });
  }
};

module.exports = { authenticate };
