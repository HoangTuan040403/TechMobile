const asyncHandler = require("../utils/asyncHandler.util");
const ProductImageService = require("../services/product-image.service");
const MESSAGES = require("../constants/messages");

const uploadProductImages = asyncHandler(async (req, res) => {
  const result = await ProductImageService.uploadProductImages(req.params.id, req.files);
  return res.status(201).json({ status: "OK", data: result });
});

const getProductImages = asyncHandler(async (req, res) => {
  const result = await ProductImageService.getProductImages(req.params.id);
  return res.status(200).json({ status: "OK", data: result });
});

const updateProductImage = asyncHandler(async (req, res) => {
  const result = await ProductImageService.updateProductImage(req.params.id, req.params.imageId, req.body);
  return res.status(200).json({ status: "OK", data: result });
});

const deleteProductImage = asyncHandler(async (req, res) => {
  await ProductImageService.deleteProductImage(req.params.id, req.params.imageId);
  return res.status(200).json({ status: "OK", message: MESSAGES.PRODUCT_IMAGE.DELETED_SUCCESS });
});

module.exports = { uploadProductImages, getProductImages, updateProductImage, deleteProductImage };
