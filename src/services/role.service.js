const roleRepository = require("../repositories/role.repository");
const permissionRepository = require("../repositories/permission.repository");
const userRepository = require("../repositories/user.repository");
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

const getRoleById = async (id) => {
  const role = await roleRepository.findById(id);
  if (!role) throw createError(MESSAGES.ROLE.NOT_FOUND, 404);
  return role;
};

const updateRole = async (id, { name, description, permissions, isActive }) => {
  const existing = await roleRepository.findById(id);
  if (!existing) throw createError(MESSAGES.ROLE.NOT_FOUND, 404);

  if (name !== undefined && name !== existing.name) {
    const duplicateName = await roleRepository.findByNameExcludeId(name, id);
    if (duplicateName) throw createError(MESSAGES.ROLE.NAME_ALREADY_EXISTS, 409);
  }

  if (permissions && permissions.length > 0) {
    const validPermissions = await permissionRepository.findByIds(permissions);
    if (validPermissions.length !== permissions.length) {
      throw createError(MESSAGES.PERMISSION.INVALID_IDS, 404);
    }
  }

  const updatePayload = {};
  if (name !== undefined) updatePayload.name = name;
  if (description !== undefined) updatePayload.description = description;
  if (permissions !== undefined) updatePayload.permissions = permissions;
  if (isActive !== undefined) updatePayload.isActive = isActive;

  return await roleRepository.updateByIdAndReturn(id, updatePayload);
};

const deleteRole = async (id) => {
  const role = await roleRepository.findById(id);
  if (!role) throw createError(MESSAGES.ROLE.NOT_FOUND, 404);

  const hasUsers = await userRepository.findOne({ role: id });
  if (hasUsers) throw createError(MESSAGES.ROLE.HAS_USERS, 400);

  await roleRepository.softDeleteById(id);
};

module.exports = { createRole, getRoles, getRoleById, updateRole, deleteRole };
