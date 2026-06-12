const productVariantRepository = require("../repositories/product-variant.repository");
const productRepository = require("../repositories/product.repository");
const MESSAGES = require("../constants/messages");
const { createError } = require("../utils/error.util");

const formatVariant = (variant) => ({
  _id: variant._id,
  attributes: variant.attributes,
  price: variant.price,
  discount: variant.discount,
  price_after_discount: Math.round(variant.price * (1 - variant.discount / 100) / 1000) * 1000,
  stock: variant.stock,
  sku: variant.sku,
  createdAt: variant.createdAt
});

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
    ...formatVariant(variant),
    product_id: variant.product_id
  };
};

const getProductVariants = async (product_id) => {
  const product = await productRepository.findById(product_id);
  if (!product) throw createError(MESSAGES.PRODUCT.NOT_FOUND, 404);

  const variants = await productVariantRepository.findByProductId(product_id);
  return variants.map(formatVariant);
};

module.exports = { createProductVariant, getProductVariants };
