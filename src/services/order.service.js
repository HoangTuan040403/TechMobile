const orderRepository = require("../repositories/order.repository");
const orderItemRepository = require("../repositories/order-item.repository");
const cartRepository = require("../repositories/cart.repository");
const cartItemRepository = require("../repositories/cart-item.repository");
const productVariantRepository = require("../repositories/product-variant.repository");
const addressRepository = require("../repositories/address.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");
const { ORDER_STATUS } = require("../constants/order.constant");

const createOrder = async (user_id, { address_id, note }) => {
  const cart = await cartRepository.findByUserId(user_id);
  if (!cart) throw createError(MESSAGES.ORDER.CART_EMPTY, 400);

  const cartItems = await cartItemRepository.findByCartId(cart._id);
  if (!cartItems.length) throw createError(MESSAGES.ORDER.CART_EMPTY, 400);

  for (const item of cartItems) {
    const variant = item.variant_id;
    if (variant.stock < item.quantity) {
      throw createError(`${item.product_id.name}: ${MESSAGES.CART.INSUFFICIENT_STOCK}`, 400);
    }
  }

  let shipping_address = null;
  if (address_id) {
    const address = await addressRepository.findById(address_id);
    if (!address) throw createError(MESSAGES.ADDRESS.NOT_FOUND, 404);
    if (address.user_id.toString() !== user_id.toString()) {
      throw createError(MESSAGES.ADDRESS.NOT_FOUND, 404);
    }
    shipping_address = `${address.full_name}, ${address.phone}, ${address.address}`;
  }

  const orderItems = cartItems.map((item) => {
    const variant = item.variant_id;
    const discount = variant.discount || 0;
    const price = Math.round(variant.price * (1 - discount / 100) / 1000) * 1000;
    return {
      product_id: item.product_id._id,
      variant_id: variant._id,
      product_name: item.product_id.name,
      variant_attributes: variant.attributes,
      price,
      quantity: item.quantity,
      subtotal: price * item.quantity
    };
  });

  const total_price = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  const order = await orderRepository.create({
    user_id,
    total_price,
    status: ORDER_STATUS.PENDING,
    address_id: address_id || null,
    shipping_address,
    note: note || null
  });

  await orderItemRepository.createMany(
    orderItems.map((item) => ({ ...item, order_id: order._id }))
  );

  await Promise.all(
    cartItems.map((item) =>
      productVariantRepository.updateById(item.variant_id._id, {
        $inc: { stock: -item.quantity }
      })
    )
  );

  await cartItemRepository.deleteByCartId(cart._id);

  return {
    _id: order._id,
    total_price: order.total_price,
    status: order.status,
    address_id: order.address_id,
    shipping_address: order.shipping_address,
    note: order.note,
    items: orderItems,
    createdAt: order.createdAt
  };
};

module.exports = { createOrder };
