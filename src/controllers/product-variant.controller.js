const asyncHandler = require("../utils/asyncHandler.util");
const ProductVariantService = require("../services/product-variant.service");
const MESSAGES = require("../constants/messages");

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

const deleteProductVariant = asyncHandler(async (req, res) => {
  await ProductVariantService.deleteProductVariant(req.params.id, req.params.variantId);
  return res.status(200).json({ status: "OK", message: MESSAGES.PRODUCT_VARIANT.DELETED_SUCCESS });
});

module.exports = { createProductVariant, getProductVariants, getProductVariantById, updateProductVariant, deleteProductVariant };
