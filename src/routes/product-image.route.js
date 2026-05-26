const express = require("express");
const router = express.Router({ mergeParams: true });
const ProductImageController = require("../controllers/product-image.controller");
const { productIdValidator } = require("../validator/product-image.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

/**
 * @swagger
 * tags:
 *   name: ProductImage
 *   description: Product Image APIs
 */

/**
 * @swagger
 * /api/products/{id}/images:
 *   post:
 *     summary: Upload images for a product (Admin only)
 *     tags: [ProductImage]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - images
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files (jpeg, png, webp - max 5MB each)
 *     responses:
 *       201:
 *         description: Images uploaded successfully
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
 *                       url:
 *                         type: string
 *                         example: "https://res.cloudinary.com/..."
 *                       public_id:
 *                         type: string
 *                         example: "products/abc123"
 *                       is_thumbnail:
 *                         type: boolean
 *                         example: false
 *                       order:
 *                         type: integer
 *                         example: 0
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       404:
 *         description: Product not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, authorize("admin"), upload.array("images", 10), productIdValidator, validate, ProductImageController.uploadProductImages);

/**
 * @swagger
 * /api/products/{id}/images:
 *   get:
 *     summary: Get all images of a product
 *     tags: [ProductImage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Images retrieved successfully
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
 *                       url:
 *                         type: string
 *                         example: "https://res.cloudinary.com/..."
 *                       public_id:
 *                         type: string
 *                         example: "products/abc123"
 *                       is_thumbnail:
 *                         type: boolean
 *                         example: false
 *                       order:
 *                         type: integer
 *                         example: 0
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/", productIdValidator, validate, ProductImageController.getProductImages);

module.exports = router;
