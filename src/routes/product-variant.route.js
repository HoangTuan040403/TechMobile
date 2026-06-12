const express = require("express");
const router = express.Router({ mergeParams: true });
const ProductVariantController = require("../controllers/product-variant.controller");
const { createProductVariantValidator, productIdValidator } = require("../validator/product-variant.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: ProductVariant
 *   description: Product Variant APIs
 */

/**
 * @swagger
 * /api/products/{id}/variants:
 *   post:
 *     summary: Create a new variant for a product (Admin only)
 *     tags: [ProductVariant]
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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - price
 *             properties:
 *               attributes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     key:
 *                       type: string
 *                       example: "color"
 *                     value:
 *                       type: string
 *                       example: "Titan Đen"
 *               price:
 *                 type: number
 *                 example: 29990000
 *               discount:
 *                 type: number
 *                 nullable: true
 *                 example: 10
 *               stock:
 *                 type: integer
 *                 example: 100
 *               sku:
 *                 type: string
 *                 nullable: true
 *                 example: "IPH15PM-256-BLACK"
 *     responses:
 *       201:
 *         description: Product variant created successfully
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
 *                     product_id:
 *                       type: string
 *                     attributes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           key:
 *                             type: string
 *                             example: "color"
 *                           value:
 *                             type: string
 *                             example: "Titan Đen"
 *                     price:
 *                       type: number
 *                       example: 29990000
 *                     discount:
 *                       type: number
 *                       nullable: true
 *                       example: 10
 *                     price_after_discount:
 *                       type: number
 *                       example: 26991000
 *                     stock:
 *                       type: integer
 *                       example: 100
 *                     sku:
 *                       type: string
 *                       nullable: true
 *                       example: "IPH15PM-256-BLACK"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
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
router.post("/", authenticate, authorize("admin"), createProductVariantValidator, validate, ProductVariantController.createProductVariant);

/**
 * @swagger
 * /api/products/{id}/variants:
 *   get:
 *     summary: Get all variants of a product
 *     tags: [ProductVariant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Variants retrieved successfully
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
 *                       attributes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             key:
 *                               type: string
 *                               example: "color"
 *                             value:
 *                               type: string
 *                               example: "Titan Đen"
 *                       price:
 *                         type: number
 *                         example: 29990000
 *                       discount:
 *                         type: number
 *                         nullable: true
 *                         example: 10
 *                       price_after_discount:
 *                         type: number
 *                         example: 26991000
 *                       stock:
 *                         type: integer
 *                         example: 100
 *                       sku:
 *                         type: string
 *                         nullable: true
 *                         example: "IPH15PM-256-BLACK"
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
router.get("/", productIdValidator, validate, ProductVariantController.getProductVariants);

module.exports = router;
