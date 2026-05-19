const asyncHandler = require("../utils/asyncHandler.util");
const PermissionService = require("../services/permission.service");

const createPermission = asyncHandler(async (req, res) => {
  const result = await PermissionService.createPermission(req.body);
  return res.status(201).json({ status: "OK", data: result });
});

const getPermissions = asyncHandler(async (req, res) => {
  const result = await PermissionService.getPermissions(req.query);
  return res.status(200).json({ status: "OK", data: result });
});

const getPermissionById = asyncHandler(async (req, res) => {
  const result = await PermissionService.getPermissionById(req.params.id);
  return res.status(200).json({ status: "OK", data: result });
});

const updatePermission = asyncHandler(async (req, res) => {
  const result = await PermissionService.updatePermission(req.params.id, req.body);
  return res.status(200).json({ status: "OK", data: result });
});

module.exports = { createPermission, getPermissions, getPermissionById, updatePermission };
