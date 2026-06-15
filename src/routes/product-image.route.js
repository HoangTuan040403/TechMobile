const express = require("express");
const router = express.Router({ mergeParams: true });
const ProductImageController = require("../controllers/product-image.controller");
const { productIdValidator, updateProductImageValidator } = require("../validator/product-image.validator");
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
 *               variant_id:
 *                 type: string
 *                 nullable: true
 *                 example: "64f1b2c3d4e5f6a7b8c9d0e1"
 *                 description: Variant ID, null for product general images
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
 *                       variant_id:
 *                         type: string
 *                         nullable: true
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
 *       - in: query
 *         name: variant_id
 *         schema:
 *           type: string
 *         description: Filter by variant ID
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
 *                       variant_id:
 *                         type: string
 *                         nullable: true
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

/**
 * @swagger
 * /api/products/{id}/images/{imageId}:
 *   patch:
 *     summary: Update a product image (Admin only)
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
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Image ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_thumbnail:
 *                 type: boolean
 *                 example: true
 *               order:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: Image updated successfully
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
 *                     variant_id:
 *                       type: string
 *                       nullable: true
 *                     url:
 *                       type: string
 *                       example: "https://res.cloudinary.com/..."
 *                     public_id:
 *                       type: string
 *                       example: "products/abc123"
 *                     is_thumbnail:
 *                       type: boolean
 *                       example: true
 *                     order:
 *                       type: integer
 *                       example: 0
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
 *         description: Product or image not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.patch("/:imageId", authenticate, authorize("admin"), updateProductImageValidator, validate, ProductImageController.updateProductImage);

/**
 * @swagger
 * /api/products/{id}/images/{imageId}:
 *   delete:
 *     summary: Delete a product image (Admin only)
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
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Image ID
 *     responses:
 *       200:
 *         description: Image deleted successfully
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
 *                   example: "Product image deleted successfully"
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       404:
 *         description: Product or image not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:imageId", authenticate, authorize("admin"), updateProductImageValidator, validate, ProductImageController.deleteProductImage);

module.exports = router;
