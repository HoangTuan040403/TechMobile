const asyncHandler = require("../utils/asyncHandler.util");
const ProductVariantService = require("../services/product-variant.service");

const createProductVariant = asyncHandler(async (req, res) => {
  const result = await ProductVariantService.createProductVariant(req.params.id, req.body);
  return res.status(201).json({ status: "OK", data: result });
});

const getProductVariants = asyncHandler(async (req, res) => {
  const result = await ProductVariantService.getProductVariants(req.params.id);
  return res.status(200).json({ status: "OK", data: result });
});

const getProductVariantById = asyncHandler(async (req, res) => {
  const result = await ProductVariantService.getProductVariantById(req.params.id, req.params.variantId);
  return res.status(200).json({ status: "OK", data: result });
});

const updateProductVariant = asyncHandler(async (req, res) => {
  const result = await ProductVariantService.updateProductVariant(req.params.id, req.params.variantId, req.body);
  return res.status(200).json({ status: "OK", data: result });
});

module.exports = { createProductVariant, getProductVariants, getProductVariantById, updateProductVariant };
