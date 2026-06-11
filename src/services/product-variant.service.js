const productVariantRepository = require("../repositories/product-variant.repository");
const productRepository = require("../repositories/product.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");

const createProductVariant = async (product_id, { attributes, price, discount, stock, sku }) => {
  const product = await productRepository.findById(product_id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  const variant = await productVariantRepository.create({
    product_id,
    attributes: attributes || [],
    price,
    discount: discount || 0,
    stock: stock || 0,
    sku: sku || null
  });

  return {
    _id: variant._id,
    product_id: variant.product_id,
    attributes: variant.attributes,
    price: variant.price,
    discount: variant.discount,
    price_after_discount: Math.round(variant.price * (1 - variant.discount / 100) / 1000) * 1000,
    stock: variant.stock,
    sku: variant.sku,
    createdAt: variant.createdAt
  };
};

module.exports = { createProductVariant };
