const productRepository = require("../repositories/product.repository");
const categoryRepository = require("../repositories/category.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");

const createProduct = async ({ name, price, discount, stock, description, category_id, specs }) => {
  const existingName = await productRepository.findByName(name);
  if (existingName) throw createError(MESSAGES.PRODUCT.NAME_ALREADY_EXISTS, 409);

  if (category_id) {
    const category = await categoryRepository.findById(category_id);
    if (!category) throw createError(MESSAGES.CATEGORY.NOT_FOUND, 404);
  }

  const product = await productRepository.create({
    name,
    price,
    discount: discount || 0,
    stock: stock || 0,
    description,
    category_id: category_id || null,
    specs: specs || {}
  });

  return {
    _id: product._id,
    name: product.name,
    price: product.price,
    discount: product.discount,
    price_after_discount: product.price * (1 - product.discount / 100),
    stock: product.stock,
    description: product.description,
    category_id: product.category_id,
    specs: product.specs,
    createdAt: product.createdAt
  };
};

module.exports = { createProduct };
