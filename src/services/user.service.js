const userRepository = require("../repositories/user.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");

const updateMe = async (userId, updateData) => {
  const { name, phone, address } = updateData;

  const user = await userRepository.findById(userId);
  if (!user) throw createError(MESSAGES.AUTH.USER_NOT_FOUND, 404);

  const updated = await userRepository.updateById(
    userId,
    { name, phone, address },
    { runValidators: true }
  );

  return {
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    phone: updated.phone,
    address: updated.address,
    role: updated.role,
    isActive: updated.isActive
  };
};

module.exports = { updateMe };
