const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const { createProductValidator } = require("../validator/product.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product APIs
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15 Pro Max"
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
 *               description:
 *                 type: string
 *                 example: "Tính năng nổi bật"
 *               category_id:
 *                 type: string
 *                 example: "64f1b2c3d4e5f6a7b8c9d0e1"
 *               specs:
 *                 type: object
 *                 example: { "screen": "6.1 inch", "ram": "8GB" }
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                       example: "iPhone 15 Pro Max"
 *                     price:
 *                       type: number
 *                       example: 29990000
 *                     discount:
 *                       type: number
 *                       example: 10
 *                     price_after_discount:
 *                       type: number
 *                       example: 26991000
 *                     stock:
 *                       type: integer
 *                       example: 100
 *                     description:
 *                       type: string
 *                     category_id:
 *                       type: string
 *                     specs:
 *                       type: object
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       404:
 *         description: Category not found
 *       409:
 *         description: Product name already exists
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, authorize("admin"), createProductValidator, validate, ProductController.createProduct);

module.exports = router;
