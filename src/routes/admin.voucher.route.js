const express = require("express");
const router = express.Router();
const VoucherController = require("../controllers/voucher.controller");
const { createVoucherValidator } = require("../validator/voucher.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: AdminVoucher
 *   description: Admin Voucher APIs
 */

/**
 * @swagger
 * /api/admin/vouchers:
 *   post:
 *     summary: Create a new voucher (Admin only)
 *     tags: [AdminVoucher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discount_type
 *               - discount_value
 *               - start_date
 *               - end_date
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SALE10"
 *               discount_type:
 *                 type: string
 *                 enum: [percentage, fixed]
 *                 example: "percentage"
 *               discount_value:
 *                 type: number
 *                 example: 10
 *               max_discount:
 *                 type: number
 *                 nullable: true
 *                 example: 100000
 *               min_order_value:
 *                 type: number
 *                 example: 500000
 *               max_uses:
 *                 type: integer
 *                 nullable: true
 *                 example: 100
 *               max_uses_per_user:
 *                 type: integer
 *                 example: 1
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-01-01T00:00:00Z"
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-12-31T23:59:59Z"
 *     responses:
 *       201:
 *         description: Voucher created successfully
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
 *                     code:
 *                       type: string
 *                       example: "SALE10"
 *                     discount_type:
 *                       type: string
 *                       example: "percentage"
 *                     discount_value:
 *                       type: number
 *                       example: 10
 *                     max_discount:
 *                       type: number
 *                       nullable: true
 *                       example: 100000
 *                     min_order_value:
 *                       type: number
 *                       example: 500000
 *                     max_uses:
 *                       type: integer
 *                       nullable: true
 *                       example: 100
 *                     max_uses_per_user:
 *                       type: integer
 *                       example: 1
 *                     used_count:
 *                       type: integer
 *                       example: 0
 *                     start_date:
 *                       type: string
 *                       format: date-time
 *                     end_date:
 *                       type: string
 *                       format: date-time
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admins only
 *       409:
 *         description: Voucher code already exists
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, authorize("admin"), createVoucherValidator, validate, VoucherController.createVoucher);

module.exports = router;
