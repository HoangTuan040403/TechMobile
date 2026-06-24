const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const { createOrderValidator, orderIdValidator } = require("../validator/order.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/auth.middleware");
const { orderRateLimit } = require("../middlewares/rateLimiter.middleware");

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order APIs
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order from cart
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address_id:
 *                 type: string
 *                 nullable: true
 *                 example: "64f1b2c3d4e5f6a7b8c9d0e1"
 *               note:
 *                 type: string
 *                 nullable: true
 *                 example: "Giao hàng giờ hành chính"
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *                     total_price:
 *                       type: number
 *                       example: 26991000
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     address_id:
 *                       type: string
 *                       nullable: true
 *                     shipping_address:
 *                       type: string
 *                       nullable: true
 *                       example: "Nguyen Van A, 0987654321, 123 Nguyen Hue"
 *                     note:
 *                       type: string
 *                       nullable: true
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product_id:
 *                             type: string
 *                           variant_id:
 *                             type: string
 *                           product_name:
 *                             type: string
 *                           variant_attributes:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 key:
 *                                   type: string
 *                                 value:
 *                                   type: string
 *                           price:
 *                             type: number
 *                           quantity:
 *                             type: integer
 *                           subtotal:
 *                             type: number
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Cart is empty or insufficient stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, orderRateLimit, createOrderValidator, validate, OrderController.createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders of current user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, paid, shipped, completed, cancelled]
 *         description: Filter by order status
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
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
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           total_price:
 *                             type: number
 *                             example: 26991000
 *                           status:
 *                             type: string
 *                             example: "pending"
 *                           shipping_address:
 *                             type: string
 *                             nullable: true
 *                           note:
 *                             type: string
 *                             nullable: true
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 10
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         totalPages:
 *                           type: integer
 *                           example: 1
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticate, OrderController.getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order retrieved successfully
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
 *                     total_price:
 *                       type: number
 *                       example: 26991000
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     address_id:
 *                       type: string
 *                       nullable: true
 *                     shipping_address:
 *                       type: string
 *                       nullable: true
 *                       example: "Nguyen Van A, 0987654321, 123 Nguyen Hue"
 *                     note:
 *                       type: string
 *                       nullable: true
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           product_id:
 *                             type: string
 *                           variant_id:
 *                             type: string
 *                           product_name:
 *                             type: string
 *                           variant_attributes:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 key:
 *                                   type: string
 *                                 value:
 *                                   type: string
 *                           price:
 *                             type: number
 *                           quantity:
 *                             type: integer
 *                           subtotal:
 *                             type: number
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticate, orderIdValidator, validate, OrderController.getOrderById);

module.exports = router;
