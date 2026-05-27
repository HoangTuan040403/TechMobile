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

const getCart = async (user_id) => {
  const cart = await cartRepository.findByUserId(user_id);
  if (!cart) return { items: [], total: 0 };

  const items = await cartItemRepository.findByCartId(cart._id);

  const formattedItems = items.map((item) => {
    const discount = item.product_id.discount || 0;
    const price_after_discount = item.product_id.price * (1 - discount / 100);

    return {
      _id: item._id,
      product: {
        _id: item.product_id._id,
        name: item.product_id.name,
        price: item.product_id.price,
        discount,
        price_after_discount,
        specs: item.product_id.specs
      },
      quantity: item.quantity,
      subtotal: price_after_discount * item.quantity
    };
  });

  const total = formattedItems.reduce((sum, item) => sum + item.subtotal, 0);

  return { items: formattedItems, total };
};

const updateCartItem = async (user_id, item_id, { quantity }) => {
  const cart = await cartRepository.findByUserId(user_id);
  if (!cart) throw createError(MESSAGES.CART.NOT_FOUND, 404);

  const item = await cartItemRepository.findById(item_id);
  if (!item) throw createError(MESSAGES.CART.ITEM_NOT_FOUND, 404);

  if (item.cart_id.toString() !== cart._id.toString()) {
    throw createError(MESSAGES.CART.ITEM_NOT_FOUND, 404);
  }

  const product = await productRepository.findById(item.product_id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  if (product.stock < quantity) throw createError(MESSAGES.CART.INSUFFICIENT_STOCK, 400);

  await cartItemRepository.updateById(item_id, { quantity });
};

const deleteCartItem = async (user_id, item_id) => {
  const cart = await cartRepository.findByUserId(user_id);
  if (!cart) throw createError(MESSAGES.CART.NOT_FOUND, 404);

  const item = await cartItemRepository.findById(item_id);
  if (!item) throw createError(MESSAGES.CART.ITEM_NOT_FOUND, 404);

  if (item.cart_id.toString() !== cart._id.toString()) {
    throw createError(MESSAGES.CART.ITEM_NOT_FOUND, 404);
  }

  await cartItemRepository.deleteById(item_id);
};

module.exports = { addToCart, getCart, updateCartItem, deleteCartItem };
