const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");

const createProductValidator = [
  body("name")
    .notEmpty().withMessage(MESSAGES.VALIDATION.PRODUCT.NAME_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.PRODUCT.NAME_MUST_BE_STRING),

  body("price")
    .notEmpty().withMessage(MESSAGES.VALIDATION.PRODUCT.PRICE_REQUIRED)
    .isNumeric().withMessage(MESSAGES.VALIDATION.PRODUCT.PRICE_MUST_BE_NUMBER)
    .custom((value) => value > 0).withMessage(MESSAGES.VALIDATION.PRODUCT.PRICE_MUST_BE_POSITIVE),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage(MESSAGES.VALIDATION.PRODUCT.STOCK_MUST_BE_NUMBER),

  body("description")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.PRODUCT.DESCRIPTION_MUST_BE_STRING),

  body("category_id")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT.CATEGORY_ID_INVALID),

  body("specs")
    .optional()
    .isObject().withMessage(MESSAGES.VALIDATION.PRODUCT.SPECS_MUST_BE_OBJECT)
];

const getProductByIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT.ID_INVALID)
];

module.exports = { createProductValidator, getProductByIdValidator };
