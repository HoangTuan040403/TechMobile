const cartRepository = require("../repositories/cart.repository");
const cartItemRepository = require("../repositories/cart-item.repository");
const productRepository = require("../repositories/product.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");

const addToCart = async (user_id, { product_id, quantity }) => {
  const product = await productRepository.findById(product_id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  if (product.stock === 0) throw createError(MESSAGES.CART.OUT_OF_STOCK, 400);
  if (product.stock < quantity) throw createError(MESSAGES.CART.INSUFFICIENT_STOCK, 400);

  let cart = await cartRepository.findByUserId(user_id);
  if (!cart) {
    cart = await cartRepository.create({ user_id });
  }

  const existingItem = await cartItemRepository.findByCartIdAndProductId(cart._id, product_id);
  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    if (product.stock < newQuantity) throw createError(MESSAGES.CART.INSUFFICIENT_STOCK, 400);

    await cartItemRepository.updateById(existingItem._id, { quantity: newQuantity });
  } else {
    await cartItemRepository.create({ cart_id: cart._id, product_id, quantity });
  }
};

module.exports = { addToCart };
