const asyncHandler = require("../utils/asyncHandler.util");
const RoleService = require("../services/role.service");
const MESSAGES = require("../constants/messages");

const createRole = asyncHandler(async (req, res) => {
  const result = await RoleService.createRole(req.body);
  return res.status(201).json({ status: "OK", data: result });
});

const getRoles = asyncHandler(async (req, res) => {
  const result = await RoleService.getRoles(req.query);
  return res.status(200).json({ status: "OK", data: result });
});

const getRoleById = asyncHandler(async (req, res) => {
  const result = await RoleService.getRoleById(req.params.id);
  return res.status(200).json({ status: "OK", data: result });
});

const updateRole = asyncHandler(async (req, res) => {
  const result = await RoleService.updateRole(req.params.id, req.body);
  return res.status(200).json({ status: "OK", data: result });
});

const deleteRole = asyncHandler(async (req, res) => {
  await RoleService.deleteRole(req.params.id);
  return res.status(200).json({ status: "OK", message: MESSAGES.ROLE.DELETED_SUCCESS });
});

module.exports = { createRole, getRoles, getRoleById, updateRole, deleteRole };
