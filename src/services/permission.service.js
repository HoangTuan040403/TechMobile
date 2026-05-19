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

const getPermissions = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";
  const module = query.module || undefined;

  const { data, pagination } = await permissionRepository.findAllPermissions({ page, limit, search, module });

  return { permissions: data, pagination };
};

const getPermissionById = async (id) => {
  const permission = await permissionRepository.findById(id);
  if (!permission) throw createError(MESSAGES.PERMISSION.NOT_FOUND, 404);
  return permission;
};

const updatePermission = async (id, { name, description, module, isActive }) => {
  const existing = await permissionRepository.findById(id);
  if (!existing) throw createError(MESSAGES.PERMISSION.NOT_FOUND, 404);

  if (name !== undefined && name !== existing.name) {
    const duplicateName = await permissionRepository.findByNameExcludeId(name, id);
    if (duplicateName) throw createError(MESSAGES.PERMISSION.NAME_ALREADY_EXISTS, 409);
  }

  const updatePayload = {};
  if (name !== undefined) updatePayload.name = name;
  if (description !== undefined) updatePayload.description = description;
  if (module !== undefined) updatePayload.module = module;
  if (isActive !== undefined) updatePayload.isActive = isActive;

  return await permissionRepository.updateByIdAndReturn(id, updatePayload);
};

module.exports = { createPermission, getPermissions, getPermissionById, updatePermission };
