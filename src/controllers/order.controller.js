const asyncHandler = require("../utils/asyncHandler.util");
const OrderService = require("../services/order.service");
const MESSAGES = require("../constants/messages");

const createOrder = asyncHandler(async (req, res) => {
  const result = await OrderService.createOrder(req.user._id, req.body);
  return res.status(201).json({ status: "OK", data: result });
});

const getOrders = asyncHandler(async (req, res) => {
  const result = await OrderService.getOrders(req.user._id, req.query);
  return res.status(200).json({ status: "OK", data: result });
});

const getOrderById = asyncHandler(async (req, res) => {
  const result = await OrderService.getOrderById(req.user._id, req.params.id);
  return res.status(200).json({ status: "OK", data: result });
})

const cancelOrder = asyncHandler(async (req, res) => {
  await OrderService.cancelOrder(req.user._id, req.params.id);
  return res.status(200).json({ status: "OK", message: MESSAGES.ORDER.CANCELLED_SUCCESS });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const result = await OrderService.getAllOrders(req.query);
  return res.status(200).json({ status: "OK", data: result });
});

module.exports = { createOrder, getOrders, getOrderById, cancelOrder, getAllOrders };
