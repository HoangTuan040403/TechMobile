const addressRepository = require("../repositories/address.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");

const createAddress = async (user_id, { full_name, phone, address, is_default }) => {
  if (is_default) {
    await addressRepository.clearDefault(user_id);
  }

  const newAddress = await addressRepository.create({
    user_id,
    full_name,
    phone,
    address,
    is_default: is_default || false
  });

  return {
    _id: newAddress._id,
    full_name: newAddress.full_name,
    phone: newAddress.phone,
    address: newAddress.address,
    is_default: newAddress.is_default,
    createdAt: newAddress.createdAt
  };
};

module.exports = { createAddress };
