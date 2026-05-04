const userRepository = require("../repositories/user.repository");
const roleRepository = require("../repositories/role.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");

const register = async (userData) => {
  const { name, email, password, phone, address } = userData;

  const existed = await userRepository.findByEmail(email);
  if (existed) throw createError(MESSAGES.AUTH.EMAIL_ALREADY_IN_USE, 400);

  const defaultRole = await roleRepository.findByName("user");
  if (!defaultRole) throw createError(MESSAGES.AUTH.DEFAULT_ROLE_NOT_FOUND, 500);

  const user = await userRepository.create({
    name, email, password, phone, address,
    role: defaultRole._id
  });

  return { _id: user._id, name: user.name, email: user.email };
};

module.exports = { register };
