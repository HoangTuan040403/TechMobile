const asyncHandler = require("../utils/asyncHandler.util");
const CartService = require("../services/cart.service");
const MESSAGES = require("../constants/messages");

const addToCart = asyncHandler(async (req, res) => {
  const result = await CartService.addToCart(req.user._id, req.body);
  return res.status(200).json({ status: "OK", message: MESSAGES.CART.ITEM_ADDED });
});

const getCart = asyncHandler(async (req, res) => {
  const result = await CartService.getCart(req.user._id);
  return res.status(200).json({ status: "OK", data: result });
});

const updateCartItem = asyncHandler(async (req, res) => {
  await CartService.updateCartItem(req.user._id, req.params.itemId, req.body);
  return res.status(200).json({ status: "OK", message: MESSAGES.CART.ITEM_UPDATED });
});

const deleteCartItem = asyncHandler(async (req, res) => {
  await CartService.deleteCartItem(req.user._id, req.params.itemId);
  return res.status(200).json({ status: "OK", message: MESSAGES.CART.ITEM_DELETED });
});

const clearCart = asyncHandler(async (req, res) => {
  await CartService.clearCart(req.user._id);
  return res.status(200).json({ status: "OK", message: MESSAGES.CART.CLEARED });
});

module.exports = { addToCart, getCart, updateCartItem, deleteCartItem, clearCart };
