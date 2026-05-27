const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");

const addToCartValidator = [
  body("product_id")
    .notEmpty().withMessage(MESSAGES.VALIDATION.CART.PRODUCT_ID_REQUIRED)
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.CART.PRODUCT_ID_INVALID),

  body("quantity")
    .optional()
    .isInt({ min: 1 }).withMessage(MESSAGES.VALIDATION.CART.QUANTITY_MUST_BE_NUMBER)
];

const updateCartItemValidator = [
  param("itemId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.CART.ITEM_ID_INVALID),

  body("quantity")
    .notEmpty().withMessage(MESSAGES.VALIDATION.CART.QUANTITY_MUST_BE_NUMBER)
    .isInt({ min: 1 }).withMessage(MESSAGES.VALIDATION.CART.QUANTITY_MUST_BE_NUMBER)
];

module.exports = { addToCartValidator, updateCartItemValidator };
