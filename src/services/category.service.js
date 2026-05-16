const categoryRepository = require("../repositories/category.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");
const { generateSlug } = require("../utils/slug.util");

const createCategory = async ({ name, slug, parent_id }) => {
  const existingName = await categoryRepository.findByName(name);
  if (existingName) throw createError(MESSAGES.CATEGORY.NAME_ALREADY_EXISTS, 409);

  const finalSlug = slug || generateSlug(name);

  const existingSlug = await categoryRepository.findBySlug(finalSlug);
  if (existingSlug) throw createError(MESSAGES.CATEGORY.SLUG_ALREADY_EXISTS, 409);

  let ancestors = [];
  if (parent_id) {
    const parent = await categoryRepository.findByIdWithAncestors(parent_id);
    if (!parent) throw createError(MESSAGES.CATEGORY.PARENT_NOT_FOUND, 404);
    ancestors = [...parent.ancestors.map((a) => a._id), parent._id];
  }

  const category = await categoryRepository.create({
    name,
    slug: finalSlug,
    parent_id: parent_id || null,
    ancestors
  });

  return {
    _id: category._id,
    name: category.name,
    slug: category.slug,
    parent_id: category.parent_id,
    ancestors: category.ancestors,
    createdAt: category.createdAt
  };
};

const getCategories = async () => {
  return await categoryRepository.findAll();
};

const getCategoryById = async (id) => {
  const category = await categoryRepository.findById(id);
  if (!category) throw createError(MESSAGES.CATEGORY.NOT_FOUND, 404);
  return category;
};

const updateCategory = async (id, { name, slug, parent_id }) => {
  const existing = await categoryRepository.findById(id);
  if (!existing) throw createError(MESSAGES.CATEGORY.NOT_FOUND, 404);

  if (name !== undefined && name !== existing.name) {
    const duplicateName = await categoryRepository.findByNameExcludeId(name, id);
    if (duplicateName) throw createError(MESSAGES.CATEGORY.NAME_ALREADY_EXISTS, 409);
  }

  let finalSlug;
  if (slug !== undefined) {
    finalSlug = slug;
  } else if (name !== undefined && name !== existing.name) {
    finalSlug = generateSlug(name);
  }

  if (finalSlug !== undefined && finalSlug !== existing.slug) {
    const duplicateSlug = await categoryRepository.findBySlugExcludeId(finalSlug, id);
    if (duplicateSlug) throw createError(MESSAGES.CATEGORY.SLUG_ALREADY_EXISTS, 409);
  }

  let newAncestors;
  if (parent_id !== undefined) {
    const currentParentId = existing.parent_id?.toString() ?? null;
    const incomingParentId = parent_id ? parent_id.toString() : null;

    if (incomingParentId !== currentParentId) {
      if (incomingParentId === id) {
        throw createError(MESSAGES.CATEGORY.CANNOT_BE_OWN_PARENT, 400);
      }

      if (incomingParentId === null) {
        newAncestors = [];
      } else {
        const parent = await categoryRepository.findByIdWithAncestors(incomingParentId);
        if (!parent) throw createError(MESSAGES.CATEGORY.PARENT_NOT_FOUND, 404);

        const isCircular = parent.ancestors.some((a) => a._id.toString() === id);
        if (isCircular) throw createError(MESSAGES.CATEGORY.CIRCULAR_REFERENCE, 400);

        newAncestors = [...parent.ancestors.map((a) => a._id), parent._id];
      }
    }
  }

  const updatePayload = {};
  if (name !== undefined) updatePayload.name = name;
  if (finalSlug !== undefined) updatePayload.slug = finalSlug;
  if (parent_id !== undefined) {
    updatePayload.parent_id = parent_id || null;
    if (newAncestors !== undefined) updatePayload.ancestors = newAncestors;
  }

  const updated = await categoryRepository.updateByIdAndReturn(id, updatePayload);
  if (!updated) throw createError(MESSAGES.CATEGORY.NOT_FOUND, 404);

  return updated;
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory };
