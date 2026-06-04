const asyncHandler = require("../utils/asyncHandler.util");
const AddressService = require("../services/address.service");

const createAddress = asyncHandler(async (req, res) => {
  const result = await AddressService.createAddress(req.user._id, req.body);
  return res.status(201).json({ status: "OK", data: result });
});

module.exports = { createAddress };
