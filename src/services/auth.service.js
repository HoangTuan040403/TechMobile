const userRepository = require("../repositories/user.repository");
const roleRepository = require("../repositories/role.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/token.util");

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

const refreshToken = async (token) => {
  if (!token) {
    throw createError(MESSAGES.AUTH.REFRESH_TOKEN_REQUIRED, 401);
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch (err) {
    throw createError(MESSAGES.AUTH.REFRESH_TOKEN_INVALID, 401);
  }

  const user = await userRepository.findByRefreshToken(token);

  if (!user) {
    await userRepository.clearRefreshToken(decoded._id);

    throw createError(MESSAGES.AUTH.REFRESH_TOKEN_REUSE_DETECTED, 403);
  }

  if (!user.isActive) {
    throw createError(MESSAGES.AUTH.ACCOUNT_INACTIVE, 403);
  }

  if (user._id.toString() !== decoded._id) {
    throw createError(MESSAGES.AUTH.REFRESH_TOKEN_INVALID, 401);
  }

  const newAccessToken = generateAccessToken({
    _id: user._id,
    role: user.role
  });

  const newRefreshToken = generateRefreshToken({
    _id: user._id
  });

  await userRepository.saveRefreshToken(user._id, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

module.exports = { register, login, logout, refreshToken };
