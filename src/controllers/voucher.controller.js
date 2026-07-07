const asyncHandler = require("../utils/asyncHandler.util");
const VoucherService = require("../services/voucher.service");

const createVoucher = asyncHandler(async (req, res) => {
  const result = await VoucherService.createVoucher(req.body);
  return res.status(201).json({ status: "OK", data: result });
});

module.exports = { createVoucher };
