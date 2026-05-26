const asyncHandler = require("../utils/asyncHandler.util");
const ProductImageService = require("../services/product-image.service");

const uploadProductImages = asyncHandler(async (req, res) => {
  const result = await ProductImageService.uploadProductImages(req.params.id, req.files);
  return res.status(201).json({ status: "OK", data: result });
});

const getProductImages = asyncHandler(async (req, res) => {
  const result = await ProductImageService.getProductImages(req.params.id);
  return res.status(200).json({ status: "OK", data: result });
});

module.exports = { uploadProductImages, getProductImages };
