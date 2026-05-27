const asyncHandler = require("../utils/asyncHandler.util");
const CartService = require("../services/cart.service");
const MESSAGES = require("../constants/messages");

const addToCart = asyncHandler(async (req, res) => {
  const result = await CartService.addToCart(req.user._id, req.body);
  return res.status(200).json({ status: "OK", message: MESSAGES.CART.ITEM_ADDED });
});

module.exports = { addToCart };
