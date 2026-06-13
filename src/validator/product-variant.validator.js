const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");

const productIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT.ID_INVALID)
];

const createProductVariantValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT.ID_INVALID),

  body("attributes")
    .optional()
    .isArray().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.ATTRIBUTES_MUST_BE_ARRAY),

  body("attributes.*.key")
    .notEmpty().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.ATTRIBUTE_KEY_REQUIRED),

  body("attributes.*.value")
    .notEmpty().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.ATTRIBUTE_VALUE_REQUIRED),

  body("price")
    .notEmpty().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.PRICE_REQUIRED)
    .isNumeric().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.PRICE_MUST_BE_NUMBER)
    .custom((value) => value > 0).withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.PRICE_MUST_BE_POSITIVE),

  body("discount")
    .optional()
    .isNumeric().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.DISCOUNT_MUST_BE_NUMBER)
    .custom((value) => value >= 0 && value <= 100).withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.DISCOUNT_INVALID),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.STOCK_MUST_BE_NUMBER),

  body("sku")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.SKU_MUST_BE_STRING)
];

const variantIdValidator = [
  param("variantId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.ID_INVALID)
];

const updateProductVariantValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT.ID_INVALID),

  param("variantId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.ID_INVALID),

  body("attributes")
    .optional()
    .isArray().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.ATTRIBUTES_MUST_BE_ARRAY),

  body("attributes.*.key")
    .optional()
    .notEmpty().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.ATTRIBUTE_KEY_REQUIRED),

  body("attributes.*.value")
    .optional()
    .notEmpty().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.ATTRIBUTE_VALUE_REQUIRED),

  body("price")
    .optional()
    .isNumeric().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.PRICE_MUST_BE_NUMBER)
    .custom((value) => value > 0).withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.PRICE_MUST_BE_POSITIVE),

  body("discount")
    .optional()
    .isNumeric().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.DISCOUNT_MUST_BE_NUMBER)
    .custom((value) => value >= 0 && value <= 100).withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.DISCOUNT_INVALID),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.STOCK_MUST_BE_NUMBER),

  body("sku")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.PRODUCT_VARIANT.SKU_MUST_BE_STRING)
];

module.exports = { productIdValidator, createProductVariantValidator, variantIdValidator, updateProductVariantValidator };
