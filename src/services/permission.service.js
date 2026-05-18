const permissionRepository = require("../repositories/permission.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");

const createPermission = async ({ name, description, module }) => {
  const existingName = await permissionRepository.findByName(name);
  if (existingName) throw createError(MESSAGES.PERMISSION.NAME_ALREADY_EXISTS, 409);

  const permission = await permissionRepository.create({
    name,
    description,
    module
  });

  return {
    _id: permission._id,
    name: permission.name,
    description: permission.description,
    module: permission.module,
    isActive: permission.isActive,
    createdAt: permission.createdAt
  };
};

module.exports = { createPermission };
