const voucherRepository = require("../repositories/voucher.repository");
const voucherUsageRepository = require("../repositories/voucher-usage.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");
const { DISCOUNT_TYPE } = require("../constants/voucher.constant");

const formatVoucher = (voucher) => ({
  _id: voucher._id,
  code: voucher.code,
  discount_type: voucher.discount_type,
  discount_value: voucher.discount_value,
  max_discount: voucher.max_discount,
  min_order_value: voucher.min_order_value,
  max_uses: voucher.max_uses,
  max_uses_per_user: voucher.max_uses_per_user,
  used_count: voucher.used_count,
  start_date: voucher.start_date,
  end_date: voucher.end_date,
  isActive: voucher.isActive,
  createdAt: voucher.createdAt
});

const createVoucher = async ({ code, discount_type, discount_value, max_discount, min_order_value, max_uses, max_uses_per_user, start_date, end_date }) => {
  const existing = await voucherRepository.findByCode(code);
  if (existing) throw createError(MESSAGES.VOUCHER.CODE_ALREADY_EXISTS, 409);

  if (discount_type === DISCOUNT_TYPE.FIXED && max_discount) {
    throw createError(MESSAGES.VOUCHER.MAX_DISCOUNT_NOT_ALLOWED, 400);
  }

  const voucher = await voucherRepository.create({
    code,
    discount_type,
    discount_value,
    max_discount: max_discount || null,
    min_order_value: min_order_value || 0,
    max_uses: max_uses || null,
    max_uses_per_user: max_uses_per_user || 1,
    start_date,
    end_date
  });

  return formatVoucher(voucher);
};

const getVouchers = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";

  const { data, pagination } = await voucherRepository.findAllVouchers({ page, limit, search });

  return { vouchers: data, pagination };
};

const getVoucherById = async (id) => {
  const voucher = await voucherRepository.findById(id);
  if (!voucher) throw createError(MESSAGES.VOUCHER.NOT_FOUND, 404);
  return formatVoucher(voucher);
};

const updateVoucher = async (id, { code, discount_type, discount_value, max_discount, min_order_value, max_uses, max_uses_per_user, start_date, end_date, isActive }) => {
  const existing = await voucherRepository.findById(id);
  if (!existing) throw createError(MESSAGES.VOUCHER.NOT_FOUND, 404);

  if (code !== undefined && code !== existing.code) {
    const duplicate = await voucherRepository.findByCodeExcludeId(code, id);
    if (duplicate) throw createError(MESSAGES.VOUCHER.CODE_ALREADY_EXISTS, 409);
  }

  const finalDiscountType = discount_type !== undefined ? discount_type : existing.discount_type;
  const finalDiscountValue = discount_value !== undefined ? discount_value : existing.discount_value;
  const finalMaxDiscount = max_discount !== undefined ? max_discount : existing.max_discount;
  const finalStartDate = start_date !== undefined ? new Date(start_date) : new Date(existing.start_date);
  const finalEndDate = end_date !== undefined ? new Date(end_date) : new Date(existing.end_date);

  if (finalDiscountType === DISCOUNT_TYPE.PERCENTAGE) {
    if (finalDiscountValue <= 0 || finalDiscountValue > 100) {
      throw createError(MESSAGES.VOUCHER.DISCOUNT_VALUE_INVALID, 400);
    }
  } else {
    if (finalDiscountValue <= 0) {
      throw createError(MESSAGES.VOUCHER.DISCOUNT_VALUE_INVALID, 400);
    }
  }

  if (finalDiscountType === DISCOUNT_TYPE.FIXED && finalMaxDiscount) {
    throw createError(MESSAGES.VOUCHER.MAX_DISCOUNT_NOT_ALLOWED, 400);
  }

  if (finalEndDate <= finalStartDate) {
    throw createError(MESSAGES.VOUCHER.END_DATE_MUST_BE_AFTER_START_DATE, 400);
  }

  const updatePayload = {};
  if (code !== undefined) updatePayload.code = code;
  if (discount_type !== undefined) updatePayload.discount_type = discount_type;
  if (discount_value !== undefined) updatePayload.discount_value = discount_value;
  if (max_discount !== undefined) updatePayload.max_discount = max_discount;
  if (min_order_value !== undefined) updatePayload.min_order_value = min_order_value;
  if (max_uses !== undefined) updatePayload.max_uses = max_uses;
  if (max_uses_per_user !== undefined) updatePayload.max_uses_per_user = max_uses_per_user;
  if (start_date !== undefined) updatePayload.start_date = start_date;
  if (end_date !== undefined) updatePayload.end_date = end_date;
  if (isActive !== undefined) updatePayload.isActive = isActive;

  const updated = await voucherRepository.updateByIdAndReturn(id, updatePayload);
  return formatVoucher(updated);
};

const deleteVoucher = async (id) => {
  const voucher = await voucherRepository.findById(id);
  if (!voucher) throw createError(MESSAGES.VOUCHER.NOT_FOUND, 404);

  await voucherRepository.softDeleteById(id);
};

const applyVoucher = async (user_id, { code, order_total }) => {
  const voucher = await voucherRepository.findByCode(code);
  if (!voucher) throw createError(MESSAGES.VOUCHER.NOT_FOUND, 404);

  if (!voucher.isActive) throw createError(MESSAGES.VOUCHER.INACTIVE, 400);

  const now = new Date();
  if (now < voucher.start_date) throw createError(MESSAGES.VOUCHER.NOT_STARTED, 400);
  if (now > voucher.end_date) throw createError(MESSAGES.VOUCHER.EXPIRED, 400);

  if (voucher.max_uses !== null && voucher.used_count >= voucher.max_uses) {
    throw createError(MESSAGES.VOUCHER.MAX_USES_REACHED, 400);
  }

  if (order_total < voucher.min_order_value) {
    throw createError(MESSAGES.VOUCHER.MIN_ORDER_VALUE_NOT_MET, 400);
  }

  const userUsageCount = await voucherUsageRepository.countByVoucherAndUser(voucher._id, user_id);
  if (userUsageCount >= voucher.max_uses_per_user) {
    throw createError(MESSAGES.VOUCHER.MAX_USES_PER_USER_REACHED, 400);
  }

  let discount_amount = 0;
  if (voucher.discount_type === DISCOUNT_TYPE.PERCENTAGE) {
    discount_amount = Math.round(order_total * voucher.discount_value / 100 / 1000) * 1000;
    if (voucher.max_discount !== null && discount_amount > voucher.max_discount) {
      discount_amount = voucher.max_discount;
    }
  } else {
    discount_amount = voucher.discount_value;
  }

  const final_total = order_total - discount_amount;

  return {
    code: voucher.code,
    discount_type: voucher.discount_type,
    discount_value: voucher.discount_value,
    discount_amount,
    final_total
  };
};

module.exports = { createVoucher, getVouchers, getVoucherById, updateVoucher, deleteVoucher, applyVoucher };
