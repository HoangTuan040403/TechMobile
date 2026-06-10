const productRepository = require("../repositories/product.repository");
const categoryRepository = require("../repositories/category.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");

const formatProduct = (product) => ({
  _id: product._id,
  name: product.name,
  category_id: product.category_id,
  specs: product.specs,
  createdAt: product.createdAt
});

const formatProductDetail = (product) => ({
  ...formatProduct(product),
  description: product.description
});

const createProduct = async ({ name, description, category_id, specs }) => {
  const existingName = await productRepository.findByName(name);
  if (existingName) throw createError(MESSAGES.PRODUCT.NAME_ALREADY_EXISTS, 409);

  if (category_id) {
    const category = await categoryRepository.findById(category_id);
    if (!category) throw createError(MESSAGES.CATEGORY.NOT_FOUND, 404);
  }

  const product = await productRepository.create({
    name,
    description,
    category_id: category_id || null,
    specs: specs || {}
  });

  return formatProductDetail(product);
};

const getProducts = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || "";
  const category_id = query.category_id || undefined;

  const { data, pagination } = await productRepository.findAllProducts({ page, limit, search, category_id });

  return {
    products: data.map(formatProduct),
    pagination
  };
};

const getProductById = async (id) => {
  const product = await productRepository.findById(id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  return formatProductDetail(product);
};

const updateProduct = async (id, { name, description, category_id, specs }) => {
  const existing = await productRepository.findById(id);
  if (!existing) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  if (name !== undefined && name !== existing.name) {
    const duplicateName = await productRepository.findByNameExcludeId(name, id);
    if (duplicateName) throw createError(MESSAGES.PRODUCT.NAME_ALREADY_EXISTS, 409);
  }

  if (category_id !== undefined && category_id !== null) {
    const category = await categoryRepository.findById(category_id);
    if (!category) throw createError(MESSAGES.CATEGORY.NOT_FOUND, 404);
  }

  const updatePayload = {};
  if (name !== undefined) updatePayload.name = name;
  if (description !== undefined) updatePayload.description = description;
  if (category_id !== undefined) updatePayload.category_id = category_id || null;
  if (specs !== undefined) updatePayload.specs = specs;

  const updated = await productRepository.updateByIdAndReturn(id, updatePayload);
  return formatProductDetail(updated);
};

const deleteProduct = async (id) => {
  const product = await productRepository.findById(id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  await productRepository.softDeleteById(id);
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
