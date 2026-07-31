const orderRepository = require("../repositories/order.repository");
const orderItemRepository = require("../repositories/order-item.repository");
const cartRepository = require("../repositories/cart.repository");
const cartItemRepository = require("../repositories/cart-item.repository");
const productVariantRepository = require("../repositories/product-variant.repository");
const userRepository = require("../repositories/user.repository");
const addressRepository = require("../repositories/address.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");
const { ORDER_STATUS, STATUS_TRANSITIONS, ORDER_TYPE } = require("../constants/order.constant");
const voucherRepository = require("../repositories/voucher.repository");
const voucherUsageRepository = require("../repositories/voucher-usage.repository");
const { DISCOUNT_TYPE } = require("../constants/voucher.constant");

const formatOrder = (order, items) => ({
  _id: order._id,
  total_price: order.total_price,
  voucher_id: order.voucher_id,
  discount_amount: order.discount_amount,
  final_total: order.final_total,
  status: order.status,
  type: order.type,
  address_id: order.address_id,
  shipping_address: order.shipping_address,
  note: order.note,
  items,
  createdAt: order.createdAt
});

const createOrder = async (user_id, { address_id, note, voucher_code }) => {
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

  let voucher = null;
  let discount_amount = 0;

  if (voucher_code) {
    voucher = await voucherRepository.findByCode(voucher_code);
    if (!voucher) throw createError(MESSAGES.VOUCHER.NOT_FOUND, 404);

    if (!voucher.isActive) throw createError(MESSAGES.VOUCHER.INACTIVE, 400);

    const now = new Date();
    if (now < voucher.start_date) throw createError(MESSAGES.VOUCHER.NOT_STARTED, 400);
    if (now > voucher.end_date) throw createError(MESSAGES.VOUCHER.EXPIRED, 400);

    if (voucher.max_uses !== null && voucher.used_count >= voucher.max_uses) {
      throw createError(MESSAGES.VOUCHER.MAX_USES_REACHED, 400);
    }

    if (total_price < voucher.min_order_value) {
      throw createError(MESSAGES.VOUCHER.MIN_ORDER_VALUE_NOT_MET, 400);
    }

    const userUsageCount = await voucherUsageRepository.countByVoucherAndUser(voucher._id, user_id);
    if (userUsageCount >= voucher.max_uses_per_user) {
      throw createError(MESSAGES.VOUCHER.MAX_USES_PER_USER_REACHED, 400);
    }

    if (voucher.discount_type === DISCOUNT_TYPE.PERCENTAGE) {
      discount_amount = Math.round(total_price * voucher.discount_value / 100 / 1000) * 1000;
      if (voucher.max_discount !== null && discount_amount > voucher.max_discount) {
        discount_amount = voucher.max_discount;
      }
    } else {
      discount_amount = voucher.discount_value;
    }
  }

  const final_total = total_price - discount_amount;

  const order = await orderRepository.create({
    user_id,
    total_price,
    voucher_id: voucher ? voucher._id : null,
    discount_amount,
    final_total,
    status: ORDER_STATUS.PENDING,
    type: ORDER_TYPE.ONLINE,
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

  if (voucher) {
    await voucherUsageRepository.create({
      voucher_id: voucher._id,
      user_id,
      order_id: order._id
    });

    await voucherRepository.updateById(voucher._id, {
      $inc: { used_count: 1 }
    });
  }

  await cartItemRepository.deleteByCartId(cart._id);

  return formatOrder(order, orderItems);
};

const getOrders = async (user_id, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const status = query.status || undefined;

  const { data, pagination } = await orderRepository.findAllByUserId({ user_id, page, limit, status });

  return { orders: data, pagination };
};

const getOrderById = async (user_id, id) => {
  const order = await orderRepository.findById(id);
  if (!order) throw createError(MESSAGES.ORDER.NOT_FOUND, 404);

  if (order.user_id.toString() !== user_id.toString()) {
    throw createError(MESSAGES.ORDER.NOT_FOUND, 404);
  }

  const items = await orderItemRepository.findByOrderId(order._id);

  return formatOrder(order, items);
};

const cancelOrder = async (user_id, id) => {
  const order = await orderRepository.findById(id);
  if (!order) throw createError(MESSAGES.ORDER.NOT_FOUND, 404);

  if (order.user_id.toString() !== user_id.toString()) {
    throw createError(MESSAGES.ORDER.NOT_FOUND, 404);
  }

  if (order.status !== ORDER_STATUS.PENDING) {
    throw createError(MESSAGES.ORDER.CANNOT_CANCEL, 400);
  }

  const items = await orderItemRepository.findByOrderId(id);
  await Promise.all(
    items.map((item) =>
      productVariantRepository.updateById(item.variant_id, {
        $inc: { stock: item.quantity }
      })
    )
  );

  await orderRepository.updateById(id, { status: ORDER_STATUS.CANCELLED });
};

const getAllOrders = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const status = query.status || undefined;
  const user_id = query.user_id || undefined;

  const { data, pagination } = await orderRepository.findAllOrders({ page, limit, status, user_id });

  return { orders: data, pagination };
};

const updateOrderStatus = async (id, { status }) => {
  const order = await orderRepository.findById(id);
  if (!order) throw createError(MESSAGES.ORDER.NOT_FOUND, 404);

  const allowedTransitions = STATUS_TRANSITIONS[order.type][order.status];
  if (!allowedTransitions.includes(status)) {
    throw createError(MESSAGES.ORDER.INVALID_STATUS_TRANSITION, 400);
  }

  await orderRepository.updateById(id, { status });
};

const createOrderByAdmin = async ({ user_id, guest_name, guest_phone, note, items }) => {
  if (user_id) {
    const user = await userRepository.findById(user_id);
    if (!user) throw createError(MESSAGES.AUTH.USER_NOT_FOUND, 404);
  }

  const orderItems = await Promise.all(
    items.map(async (item) => {
      const variant = await productVariantRepository.findByIdWithProduct(item.variant_id);
      if (!variant) throw createError(MESSAGES.PRODUCT_VARIANT.NOT_FOUND, 404);
      if (variant.stock < item.quantity) {
        throw createError(MESSAGES.CART.INSUFFICIENT_STOCK, 400);
      }

      const discount = variant.discount || 0;
      const price = Math.round(variant.price * (1 - discount / 100) / 1000) * 1000;

      return {
        product_id: variant.product_id._id,
        variant_id: variant._id,
        product_name: variant.product_id.name,
        variant_attributes: variant.attributes,
        price,
        quantity: item.quantity,
        subtotal: price * item.quantity
      };
    })
  );

  const total_price = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  const order = await orderRepository.create({
    user_id: user_id || null,
    guest_name: guest_name || null,
    guest_phone: guest_phone || null,
    total_price,
    status: ORDER_STATUS.PENDING,
    type: ORDER_TYPE.INSTORE,
    note: note || null
  });

  await orderItemRepository.createMany(
    orderItems.map((item) => ({ ...item, order_id: order._id }))
  );

  await Promise.all(
    items.map((item) =>
      productVariantRepository.updateById(item.variant_id, {
        $inc: { stock: -item.quantity }
      })
    )
  );

  return {
    ...formatOrder(order, orderItems),
    guest_name: order.guest_name,
    guest_phone: order.guest_phone
  };
};

module.exports = { createOrder, getOrders, getOrderById, cancelOrder, getAllOrders, updateOrderStatus, createOrderByAdmin };
