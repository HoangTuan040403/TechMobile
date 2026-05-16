const asyncHandler = require("../utils/asyncHandler.util");
const CategoryService = require("../services/category.service");

const createCategory = asyncHandler(async (req, res) => {
  const result = await CategoryService.createCategory(req.body, req.file);
  return res.status(201).json({ status: "OK", data: result });
});

const getCategories = asyncHandler(async (req, res) => {
  const result = await CategoryService.getCategories();
  return res.status(200).json({ status: "OK", data: result });
});

const getCategoryById = asyncHandler(async (req, res) => {
  const result = await CategoryService.getCategoryById(req.params.id);
  return res.status(200).json({ status: "OK", data: result });
});

const updateCategory = asyncHandler(async (req, res) => {
  const result = await CategoryService.updateCategory(req.params.id, req.body);
  return res.status(200).json({ status: "OK", data: result });
});

module.exports = { createCategory, getCategories, getCategoryById, updateCategory };
