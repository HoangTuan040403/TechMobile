const roleRepository = require("../repositories/role.repository");
const permissionRepository = require("../repositories/permission.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");

const createRole = async ({ name, description, permissions }) => {
  const existingName = await roleRepository.findByName(name);
  if (existingName) throw createError(MESSAGES.ROLE.NAME_ALREADY_EXISTS, 409);

  if (permissions && permissions.length > 0) {
    const validPermissions = await permissionRepository.findByIds(permissions);
    if (validPermissions.length !== permissions.length) {
      throw createError(MESSAGES.PERMISSION.INVALID_IDS, 404);
    }
  }

  const role = await roleRepository.create({
    name,
    description,
    permissions: permissions || []
  });

  return {
    _id: role._id,
    name: role.name,
    description: role.description,
    permissions: role.permissions,
    isActive: role.isActive,
    createdAt: role.createdAt
  };
};

const getRoles = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";

  const { data, pagination } = await roleRepository.findAllRoles({ page, limit, search });

  return { roles: data, pagination };
};

module.exports = { createRole, getRoles };
