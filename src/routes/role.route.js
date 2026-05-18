const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/role.controller");
const { createRoleValidator } = require("../validator/role.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role APIs
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role (Admin only)
 *     tags: [Role]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "manager"
 *               description:
 *                 type: string
 *                 example: "Manager role"
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64f1b2c3d4e5f6a7b8c9d0e1"]
 *     responses:
 *       201:
 *         description: Role created successfully
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
 *                       example: "manager"
 *                     description:
 *                       type: string
 *                       example: "Manager role"
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: string
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
 *         description: Role name already exists
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, authorize("admin"), createRoleValidator, validate, RoleController.createRole);

module.exports = router;
