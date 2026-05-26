const { param, body } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");

const productIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT.ID_INVALID)
];

const updateProductImageValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT.ID_INVALID),

  param("imageId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT_IMAGE.IMAGE_ID_INVALID),

  body("is_thumbnail")
    .optional()
    .isBoolean().withMessage(MESSAGES.VALIDATION.PRODUCT_IMAGE.IS_THUMBNAIL_MUST_BE_BOOLEAN),

  body("order")
    .optional()
    .isInt({ min: 0 }).withMessage(MESSAGES.VALIDATION.PRODUCT_IMAGE.ORDER_MUST_BE_NUMBER)
];

module.exports = { productIdValidator, updateProductImageValidator };
