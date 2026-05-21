const asyncHandler = require("../utils/asyncHandler.util");
const ProductService = require("../services/product.service");

const createProduct = asyncHandler(async (req, res) => {
  const result = await ProductService.createProduct(req.body);
  return res.status(201).json({ status: "OK", data: result });
});

module.exports = { createProduct };
