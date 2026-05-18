const asyncHandler = require("../utils/asyncHandler.util");
const PermissionService = require("../services/permission.service");

const createPermission = asyncHandler(async (req, res) => {
  const result = await PermissionService.createPermission(req.body);
  return res.status(201).json({ status: "OK", data: result });
});

module.exports = { createPermission };
