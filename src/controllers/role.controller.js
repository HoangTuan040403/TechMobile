const asyncHandler = require("../utils/asyncHandler.util");
const RoleService = require("../services/role.service");

const createRole = asyncHandler(async (req, res) => {
  const result = await RoleService.createRole(req.body);
  return res.status(201).json({ status: "OK", data: result });
});

const getRoles = asyncHandler(async (req, res) => {
  const result = await RoleService.getRoles(req.query);
  return res.status(200).json({ status: "OK", data: result });
});

module.exports = { createRole, getRoles };
