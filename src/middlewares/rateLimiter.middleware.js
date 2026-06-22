const rateLimit = require("express-rate-limit");
const MESSAGES = require("../constants/messages");

const orderRateLimit = rateLimit({
  windowMs: parseInt(process.env.ORDER_RATE_LIMIT_WINDOW_MS) || 60 * 1000,
  max: parseInt(process.env.ORDER_RATE_LIMIT_MAX) || 5,
  message: { status: "ERR", message: MESSAGES.ORDER.TOO_MANY_REQUESTS },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { orderRateLimit };
