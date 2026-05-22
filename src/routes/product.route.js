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

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                             example: "iPhone 15 Pro Max"
 *                           price:
 *                             type: number
 *                             example: 29990000
 *                           discount:
 *                             type: number
 *                             nullable: true
 *                             example: 10
 *                           price_after_discount:
 *                             type: number
 *                             example: 26991000
 *                           stock:
 *                             type: integer
 *                             example: 100
 *                           category_id:
 *                             type: string
 *                           specs:
 *                             type: object
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 20
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         totalPages:
 *                           type: integer
 *                           example: 2
 *       500:
 *         description: Internal server error
 */
router.get("/", ProductController.getProducts);

module.exports = router;
