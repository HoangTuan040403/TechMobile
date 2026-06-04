const express = require("express");
const router = express.Router();
const AddressController = require("../controllers/address.controller");
const { createAddressValidator } = require("../validator/address.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: Address APIs
 */

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - phone
 *               - address
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "Nguyen Van A"
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *               address:
 *                 type: string
 *                 example: "123 Nguyen Hue, Ho Chi Minh City"
 *               is_default:
 *                 type: boolean
 *                 nullable: true
 *                 example: false
 *     responses:
 *       201:
 *         description: Address created successfully
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
 *                     full_name:
 *                       type: string
 *                       example: "Nguyen Van A"
 *                     phone:
 *                       type: string
 *                       example: "0987654321"
 *                     address:
 *                       type: string
 *                       example: "123 Nguyen Hue, Ho Chi Minh City"
 *                     is_default:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, createAddressValidator, validate, AddressController.createAddress);

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: Get all addresses of current user
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses retrieved successfully
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
 *                       full_name:
 *                         type: string
 *                         example: "Nguyen Van A"
 *                       phone:
 *                         type: string
 *                         example: "0987654321"
 *                       address:
 *                         type: string
 *                         example: "123 Nguyen Hue, Ho Chi Minh City"
 *                       is_default:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticate, AddressController.getAddresses);

module.exports = router;
