const asyncHandler = require("../utils/asyncHandler.util");
const ProductVariantService = require("../services/product-variant.service");

const createProductVariant = asyncHandler(async (req, res) => {
  const result = await ProductVariantService.createProductVariant(req.params.id, req.body);
  return res.status(201).json({ status: "OK", data: result });
});

module.exports = { createProductVariant };
