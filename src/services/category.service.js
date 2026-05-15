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

    ancestors = [...parent.ancestors, parent._id];
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

module.exports = { createCategory, getCategories };
