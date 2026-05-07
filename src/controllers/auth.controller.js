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

module.exports = { register, login, logout, refreshToken };
