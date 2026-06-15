const express = require("express");
const router = express.Router({ mergeParams: true });
const ProductVariantController = require("../controllers/product-variant.controller");
const { createProductVariantValidator, productIdValidator, variantIdValidator, updateProductVariantValidator } = require("../validator/product-variant.validator");
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

/**
 * @swagger
 * /api/products/{id}/variants/{variantId}:
 *   get:
 *     summary: Get a variant by ID
 *     tags: [ProductVariant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant ID
 *     responses:
 *       200:
 *         description: Variant retrieved successfully
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
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Product or variant not found
 *       500:
 *         description: Internal server error
 */
router.get("/:variantId", variantIdValidator, validate, ProductVariantController.getProductVariantById);

/**
 * @swagger
 * /api/products/{id}/variants/{variantId}:
 *   patch:
 *     summary: Update a product variant (Admin only)
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
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: Product variant updated successfully
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
 *                     attributes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           key:
 *                             type: string
 *                           value:
 *                             type: string
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
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       404:
 *         description: Product or variant not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.patch("/:variantId", authenticate, authorize("admin"), updateProductVariantValidator, validate, ProductVariantController.updateProductVariant);

/**
 * @swagger
 * /api/products/{id}/variants/{variantId}:
 *   delete:
 *     summary: Delete a product variant (Admin only)
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
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Variant ID
 *     responses:
 *       200:
 *         description: Product variant deleted successfully
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
 *                   example: "Product variant deleted successfully"
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       404:
 *         description: Product or variant not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:variantId", authenticate, authorize("admin"), variantIdValidator, validate, ProductVariantController.deleteProductVariant);

module.exports = router;
