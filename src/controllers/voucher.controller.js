const asyncHandler = require("../utils/asyncHandler.util");
const VoucherService = require("../services/voucher.service");
const MESSAGES = require("../constants/messages");

const createVoucher = asyncHandler(async (req, res) => {
  const result = await VoucherService.createVoucher(req.body);
  return res.status(201).json({ status: "OK", data: result });
});

const getVouchers = asyncHandler(async (req, res) => {
  const result = await VoucherService.getVouchers(req.query);
  return res.status(200).json({ status: "OK", data: result });
});

const getVoucherById = asyncHandler(async (req, res) => {
  const result = await VoucherService.getVoucherById(req.params.id);
  return res.status(200).json({ status: "OK", data: result });
});

const updateVoucher = asyncHandler(async (req, res) => {
  const result = await VoucherService.updateVoucher(req.params.id, req.body);
  return res.status(200).json({ status: "OK", data: result });
});

const deleteVoucher = asyncHandler(async (req, res) => {
  await VoucherService.deleteVoucher(req.params.id);
  return res.status(200).json({ status: "OK", message: MESSAGES.VOUCHER.DELETED_SUCCESS });
});

const applyVoucher = asyncHandler(async (req, res) => {
  const result = await VoucherService.applyVoucher(req.user._id, req.body);
  return res.status(200).json({ status: "OK", data: result });
});

module.exports = { createVoucher, getVouchers, getVoucherById, updateVoucher, deleteVoucher, applyVoucher };
