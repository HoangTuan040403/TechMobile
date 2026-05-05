const jwt = require("jsonwebtoken");
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

const login = async ({ email, password }) => {
  const userWithPassword = await userRepository.findByEmailWithPassword(email);
  if (!userWithPassword) throw createError(MESSAGES.AUTH.INVALID_CREDENTIALS, 401);

  if (!userWithPassword.isActive) throw createError(MESSAGES.AUTH.ACCOUNT_INACTIVE, 403);

  const isMatch = await userWithPassword.comparePassword(password);
  if (!isMatch) throw createError(MESSAGES.AUTH.INVALID_CREDENTIALS, 401);

  const token = jwt.sign(
    { _id: userWithPassword._id, role: userWithPassword.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

  return {
    _id: userWithPassword._id,
    name: userWithPassword.name,
    email: userWithPassword.email,
    role: userWithPassword.role,
    token
  };
};

module.exports = { register, login };
