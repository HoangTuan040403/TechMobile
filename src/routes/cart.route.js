const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const { addToCartValidator, updateCartItemValidator, cartItemIdValidator } = require("../validator/cart.validator");
const { validate } = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart APIs
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product variant to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - variant_id
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "64f1b2c3d4e5f6a7b8c9d0e1"
 *               variant_id:
 *                 type: string
 *                 example: "64f1b2c3d4e5f6a7b8c9d0e2"
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Item added to cart successfully
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
 *                   example: "Item added to cart successfully"
 *       400:
 *         description: Out of stock or insufficient stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product or variant not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, addToCartValidator, validate, CartController.addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
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
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           product:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                                 example: "iPhone 15 Pro Max"
 *                               specs:
 *                                 type: object
 *                           variant:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               attributes:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     key:
 *                                       type: string
 *                                       example: "color"
 *                                     value:
 *                                       type: string
 *                                       example: "Titan Đen"
 *                               price:
 *                                 type: number
 *                                 example: 29990000
 *                               discount:
 *                                 type: number
 *                                 example: 10
 *                               price_after_discount:
 *                                 type: number
 *                                 example: 26991000
 *                           quantity:
 *                             type: integer
 *                             example: 1
 *                           subtotal:
 *                             type: number
 *                             example: 26991000
 *                     total:
 *                       type: number
 *                       example: 26991000
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticate, CartController.getCart);

/**
 * @swagger
 * /api/cart/{itemId}:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart item updated successfully
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
 *                   example: "Cart item updated successfully"
 *       400:
 *         description: Insufficient stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart or item not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.patch("/:itemId", authenticate, updateCartItemValidator, validate, CartController.updateCartItem);

/**
 * @swagger
 * /api/cart/{itemId}:
 *   delete:
 *     summary: Remove an item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart Item ID
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
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
 *                   example: "Cart item deleted successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart or item not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:itemId", authenticate, cartItemIdValidator, validate, CartController.deleteCartItem);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Clear all items in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
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
 *                   example: "Cart cleared successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
router.delete("/", authenticate, CartController.clearCart);

module.exports = router;
