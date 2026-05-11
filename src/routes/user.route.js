const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { updateMeValidator } = require("../validator/user.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User APIs
 */

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Update current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nguyen Van B
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *               address:
 *                 type: string
 *                 example: "123 Nguyen Hue, HCM"
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
 *                       example: 64f1b2c3d4e5f6a7b8c9d0e1
 *                     name:
 *                       type: string
 *                       example: Nguyen Van B
 *                     email:
 *                       type: string
 *                       example: nguyenvana@gmail.com
 *                     phone:
 *                       type: string
 *                       example: "0987654321"
 *                     address:
 *                       type: string
 *                       example: "123 Nguyen Hue, HCM"
 *                     role:
 *                       type: string
 *                       example: 64f1b2c3d4e5f6a7b8c9d0e2
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERR
 *                 message:
 *                   type: string
 *                   example: Invalid phone number
 *       500:
 *         description: Internal server error
 */
router.put("/me", authenticate, updateMeValidator, validate, UserController.updateMe);

module.exports = router;
