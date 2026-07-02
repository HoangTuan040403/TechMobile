const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const { orderIdValidator, getOrdersValidator, updateOrderStatusValidator, createOrderByAdminValidator } = require("../validator/order.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: AdminOrder
 *   description: Admin Order APIs
 */

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [AdminOrder]
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
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: Filter by user ID
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
 *                           user_id:
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticate, authorize("admin"), getOrdersValidator, validate, OrderController.getAllOrders);

/**
 * @swagger
 * /api/admin/orders/{id}/status:
 *   patch:
 *     summary: Update order status (Admin only)
 *     tags: [AdminOrder]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, shipped, completed, cancelled]
 *                 example: "paid"
 *     responses:
 *       200:
 *         description: Order status updated successfully
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
 *                   example: "Order status updated successfully"
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       404:
 *         description: Order not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.patch("/:id/status", authenticate, authorize("admin"), updateOrderStatusValidator, validate, OrderController.updateOrderStatus);

/**
 * @swagger
 * /api/admin/orders:
 *   post:
 *     summary: Create a new instore order (Admin only)
 *     tags: [AdminOrder]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               user_id:
 *                 type: string
 *                 nullable: true
 *                 example: "64f1b2c3d4e5f6a7b8c9d0e1"
 *               guest_name:
 *                 type: string
 *                 nullable: true
 *                 example: "Nguyen Van A"
 *               guest_phone:
 *                 type: string
 *                 nullable: true
 *                 example: "0987654321"
 *               note:
 *                 type: string
 *                 nullable: true
 *                 example: "Khách mua tại cửa hàng"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - variant_id
 *                     - quantity
 *                   properties:
 *                     variant_id:
 *                       type: string
 *                       example: "64f1b2c3d4e5f6a7b8c9d0e3"
 *                     quantity:
 *                       type: integer
 *                       example: 1
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
 *                     user_id:
 *                       type: string
 *                       nullable: true
 *                     guest_name:
 *                       type: string
 *                       nullable: true
 *                     guest_phone:
 *                       type: string
 *                       nullable: true
 *                     total_price:
 *                       type: number
 *                       example: 26991000
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     type:
 *                       type: string
 *                       example: "instore"
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
 *         description: Insufficient stock
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       404:
 *         description: User or variant not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, authorize("admin"), createOrderByAdminValidator, validate, OrderController.createOrderByAdmin);

module.exports = router;
