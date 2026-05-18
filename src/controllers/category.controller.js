const asyncHandler = require("../utils/asyncHandler.util");
const CategoryService = require("../services/category.service");
const MESSAGES = require("../constants/messages");

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
  const result = await CategoryService.updateCategory(req.params.id, req.body, req.file);
  return res.status(200).json({ status: "OK", data: result });
});

const deleteCategory = asyncHandler(async (req, res) => {
  await CategoryService.deleteCategory(req.params.id);
  return res.status(200).json({ status: "OK", message: MESSAGES.CATEGORY.DELETED_SUCCESS });
});

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
