const voucherRepository = require("../repositories/voucher.repository");
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

module.exports = { createVoucher, getVouchers };
