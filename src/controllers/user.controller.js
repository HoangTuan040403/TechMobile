const asyncHandler = require("../utils/asyncHandler.util");
const UserService = require("../services/user.service");

const updateMe = asyncHandler(async (req, res) => {
  const result = await UserService.updateMe(req.user._id, req.body);
  return res.status(200).json({ status: "OK", data: result });
});

const changePassword = asyncHandler(async (req, res) => {
  const result = await UserService.changePassword(req.user._id, req.body);
  return res.status(200).json({ status: "OK", message: result.message });
});

const getUsers = asyncHandler(async (req, res) => {
  const result = await UserService.getUsers(req.query);
  return res.status(200).json({ status: "OK", data: result });
});

const getUserById = asyncHandler(async (req, res) => {
  const result = await UserService.getUserById(req.params.id);
  return res.status(200).json({ status: "OK", data: result });
});

module.exports = { updateMe, changePassword, getUsers, getUserById };
