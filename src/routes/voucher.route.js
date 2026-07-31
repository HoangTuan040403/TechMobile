const express = require("express");
const router = express.Router();
const VoucherController = require("../controllers/voucher.controller");
const { applyVoucherValidator } = require("../validator/voucher.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Voucher
 *   description: Voucher APIs
 */

/**
 * @swagger
 * /api/vouchers/apply:
 *   post:
 *     summary: Apply a voucher
 *     tags: [Voucher]
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
 *               - order_total
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SALE10"
 *               order_total:
 *                 type: number
 *                 example: 1000000
 *     responses:
 *       200:
 *         description: Voucher applied successfully
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
 *                     code:
 *                       type: string
 *                       example: "SALE10"
 *                     discount_type:
 *                       type: string
 *                       example: "percentage"
 *                     discount_value:
 *                       type: number
 *                       example: 10
 *                     discount_amount:
 *                       type: number
 *                       example: 100000
 *                     final_total:
 *                       type: number
 *                       example: 900000
 *       400:
 *         description: Voucher invalid, expired or conditions not met
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Voucher not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/apply", authenticate, applyVoucherValidator, validate, VoucherController.applyVoucher);

module.exports = router;
