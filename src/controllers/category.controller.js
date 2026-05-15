const asyncHandler = require("../utils/asyncHandler.util");
const CategoryService = require("../services/category.service");

const createCategory = asyncHandler(async (req, res) => {
  const result = await CategoryService.createCategory(req.body);
  return res.status(201).json({ status: "OK", data: result });
});

module.exports = { createCategory };
