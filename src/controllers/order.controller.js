const asyncHandler = require("../utils/asyncHandler.util");
const OrderService = require("../services/order.service");

const createOrder = asyncHandler(async (req, res) => {
  const result = await OrderService.createOrder(req.user._id, req.body);
  return res.status(201).json({ status: "OK", data: result });
});

module.exports = { createOrder };
