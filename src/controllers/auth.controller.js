const asyncHandler = require("../utils/asyncHandler.util");
const AuthService = require("../services/auth.service");
const { parseExpiry } = require("../utils/time.util");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: parseExpiry(process.env.JWT_REFRESH_EXPIRES_IN)
};

const register = asyncHandler(async (req, res) => {
  const user = await AuthService.register(req.body);
  return res.status(201).json({ status: "OK", data: user });
});

const login = asyncHandler(async (req, res) => {
  const result = await AuthService.login(req.body);
  res.cookie("refreshToken", result.refreshToken, COOKIE_OPTIONS);
  const { refreshToken, ...data } = result;
  return res.status(200).json({ status: "OK", data });
});

const logout = asyncHandler(async (req, res) => {
  const result = await AuthService.logout(req.user._id);
  res.clearCookie("refreshToken", COOKIE_OPTIONS);
  return res.status(200).json({ status: "OK", data: result });
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  const result = await AuthService.refreshToken(token);
  res.cookie("refreshToken", result.refreshToken, COOKIE_OPTIONS);
  const { refreshToken: _, ...data } = result;
  return res.status(200).json({ status: "OK", data });
});

const getMe = asyncHandler(async (req, res) => {
  const result = await AuthService.getMe(req.user._id);
  return res.status(200).json({ status: "OK", data: result });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const result = await AuthService.forgotPassword(req.body.email);
  return res.status(200).json({ status: "OK", data: result });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  const result = await AuthService.resetPassword(token, newPassword);
  return res.status(200).json({ status: "OK", data: result });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const result = await AuthService.verifyEmail(token);
  return res.status(200).json({ status: "OK", data: result });
});

module.exports = { register, login, logout, refreshToken, getMe, forgotPassword, resetPassword, verifyEmail };
