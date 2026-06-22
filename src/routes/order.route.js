const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const { createOrderValidator } = require("../validator/order.validator");
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

module.exports = router;
