const express = require("express");
const router = express.Router();
const PermissionController = require("../controllers/permission.controller");
const { createPermissionValidator } = require("../validator/permission.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Permission
 *   description: Permission APIs
 */

/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Create a new permission (Admin only)
 *     tags: [Permission]
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
 *               - module
 *             properties:
 *               name:
 *                 type: string
 *                 example: "category:create"
 *               description:
 *                 type: string
 *                 example: "Create category"
 *               module:
 *                 type: string
 *                 example: "category"
 *     responses:
 *       201:
 *         description: Permission created successfully
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
 *                       example: "category:create"
 *                     description:
 *                       type: string
 *                       example: "Create category"
 *                     module:
 *                       type: string
 *                       example: "category"
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
 *         description: Permission name already exists
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, authorize("admin"), createPermissionValidator, validate, PermissionController.createPermission);

module.exports = router;
