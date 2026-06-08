const asyncHandler = require("../utils/asyncHandler.util");
const AddressService = require("../services/address.service");
const MESSAGES = require("../constants/messages");

const createAddress = asyncHandler(async (req, res) => {
    const result = await AddressService.createAddress(req.user._id, req.body);
    return res.status(201).json({ status: "OK", data: result });
});

const getAddresses = asyncHandler(async (req, res) => {
    const result = await AddressService.getAddresses(req.user._id);
    return res.status(200).json({ status: "OK", data: result });
});

const getAddressById = asyncHandler(async (req, res) => {
    const result = await AddressService.getAddressById(req.user._id, req.params.id);
    return res.status(200).json({ status: "OK", data: result });
});

const updateAddress = asyncHandler(async (req, res) => {
    const result = await AddressService.updateAddress(req.user._id, req.params.id, req.body);
    return res.status(200).json({ status: "OK", data: result });
});

const deleteAddress = asyncHandler(async (req, res) => {
  await AddressService.deleteAddress(req.user._id, req.params.id);
  return res.status(200).json({ status: "OK", message: MESSAGES.ADDRESS.DELETED_SUCCESS });
});

module.exports = { createAddress, getAddresses, getAddressById, updateAddress, deleteAddress };
