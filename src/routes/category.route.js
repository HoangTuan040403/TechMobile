const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const { createCategoryValidator, getCategoryByIdValidator, updateCategoryValidator } = require("../validator/category.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category APIs
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category (Admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Phone"
 *               slug:
 *                 type: string
 *                 example: "phone"
 *               parent_id:
 *                 type: string
 *                 nullable: true
 *                 example: "64f1b2c3d4e5f6a7b8c9d0e1"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (jpeg, png, webp - max 5MB)
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                       example: "Điện thoại"
 *                     slug:
 *                       type: string
 *                       example: "dien-thoai"
 *                     parent_id:
 *                       type: string
 *                       nullable: true
 *                     ancestors:
 *                       type: array
 *                       items:
 *                         type: string
 *                     image:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                           example: "https://res.cloudinary.com/..."
 *                         public_id:
 *                           type: string
 *                           example: "categories/abc123"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       409:
 *         description: Category name or slug already exists
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, authorize("admin"), upload.single("image"), createCategoryValidator, validate, CategoryController.createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: "Điện thoại"
 *                       slug:
 *                         type: string
 *                         example: "dien-thoai"
 *                       parent_id:
 *                         type: string
 *                         nullable: true
 *                       ancestors:
 *                         type: array
 *                         items:
 *                           type: string
 *                       image:
 *                         type: object
 *                         properties:
 *                           url:
 *                             type: string
 *                             nullable: true
 *                             example: "https://res.cloudinary.com/..."
 *                           public_id:
 *                             type: string
 *                             nullable: true
 *                             example: "categories/abc123"
 *       500:
 *         description: Internal server error
 */
router.get("/", CategoryController.getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     parent_id:
 *                       type: string
 *                       nullable: true
 *                     ancestors:
 *                       type: array
 *                       items:
 *                         type: string
 *                     image:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                           nullable: true
 *                           example: "https://res.cloudinary.com/..."
 *                         public_id:
 *                           type: string
 *                           nullable: true
 *                           example: "categories/abc123"
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getCategoryByIdValidator, validate, CategoryController.getCategoryById);

/**
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     summary: Update a category by ID (Admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Phone"
 *               slug:
 *                 type: string
 *                 example: "phone"
 *               parent_id:
 *                 type: string
 *                 nullable: true
 *                 example: "64f1b2c3d4e5f6a7b8c9d0e1"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (jpeg, png, webp - max 5MB)
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     parent_id:
 *                       type: string
 *                       nullable: true
 *                     ancestors:
 *                       type: array
 *                       items:
 *                         type: string
 *                     image:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                           example: "https://res.cloudinary.com/..."
 *                         public_id:
 *                           type: string
 *                           example: "categories/abc123"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid ID / circular reference / self-parent
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       404:
 *         description: Category not found
 *       409:
 *         description: Name or slug already exists
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authenticate, authorize("admin"), upload.single("image"), updateCategoryValidator, validate, CategoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID (Admin only)
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticate, authorize("admin"), getCategoryByIdValidator, validate, CategoryController.deleteCategory);

module.exports = router;
