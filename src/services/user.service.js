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

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await userRepository.findByIdWithPassword(userId);
  if (!user) throw createError(MESSAGES.AUTH.USER_NOT_FOUND, 404);

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw createError(MESSAGES.AUTH.WRONG_PASSWORD, 400);

  user.password = newPassword;
  await user.save();

  return { message: MESSAGES.AUTH.RESET_PASSWORD_SUCCESS };
}

const getUsers = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";
  const isActive = query.isActive !== undefined
    ? query.isActive === "true"
    : undefined;

  const { users, total } = await userRepository.findAllUsers({ page, limit, search, isActive });

  return {
    users: users.map((u) => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      address: u.address,
      role: u.role,
      isActive: u.isActive,
      createdAt: u.createdAt
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getUserById = async (id) => {
  const user = await userRepository.findByIdWithRole(id);
  if (!user) throw createError(MESSAGES.AUTH.USER_NOT_FOUND, 404);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt
  };
};

module.exports = { updateMe, changePassword, getUsers, getUserById };
