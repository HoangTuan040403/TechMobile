const userRepository = require("../repositories/user.repository");
const roleRepository = require("../repositories/role.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");
const { generateAccessToken, generateRefreshToken } = require("../utils/token.util");

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

  const isMatch = await userWithPassword.comparePassword(password);
  if (!isMatch) throw createError(MESSAGES.AUTH.INVALID_CREDENTIALS, 401);

  if (!userWithPassword.isActive) throw createError(MESSAGES.AUTH.ACCOUNT_INACTIVE, 403);

  const accessToken = generateAccessToken({
    _id: userWithPassword._id,
    role: userWithPassword.role
  });

  const refreshToken = generateRefreshToken({
    _id: userWithPassword._id
  });

  await userRepository.saveRefreshToken(userWithPassword._id, refreshToken);

  return {
    _id: userWithPassword._id,
    name: userWithPassword.name,
    email: userWithPassword.email,
    role: userWithPassword.role,
    accessToken,
    refreshToken
  };
};

const logout = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) throw createError(MESSAGES.AUTH.USER_NOT_FOUND, 404);

  await userRepository.clearRefreshToken(userId);

  return { message: MESSAGES.AUTH.LOGOUT_SUCCESS };
};

module.exports = { register, login, logout };
