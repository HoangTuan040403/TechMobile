const asyncHandler = require("../utils/asyncHandler.util");
const ProductService = require("../services/product.service");

const createProduct = asyncHandler(async (req, res) => {
  const result = await ProductService.createProduct(req.body);
  return res.status(201).json({ status: "OK", data: result });
});

const getProducts = asyncHandler(async (req, res) => {
  const result = await ProductService.getProducts(req.query);
  return res.status(200).json({ status: "OK", data: result });
});

const getProductById = asyncHandler(async (req, res) => {
  const result = await ProductService.getProductById(req.params.id);
  return res.status(200).json({ status: "OK", data: result });
});

module.exports = { createProduct, getProducts, getProductById };
