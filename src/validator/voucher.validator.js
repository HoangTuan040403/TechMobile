const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");
const { DISCOUNT_TYPE } = require("../constants/voucher.constant");

const createVoucherValidator = [
  body("code")
    .notEmpty().withMessage(MESSAGES.VALIDATION.VOUCHER.CODE_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.VOUCHER.CODE_MUST_BE_STRING),

  body("discount_type")
    .notEmpty().withMessage(MESSAGES.VALIDATION.VOUCHER.DISCOUNT_TYPE_REQUIRED)
    .isIn(Object.values(DISCOUNT_TYPE)).withMessage(MESSAGES.VALIDATION.VOUCHER.DISCOUNT_TYPE_INVALID),

  body("discount_value")
    .notEmpty().withMessage(MESSAGES.VALIDATION.VOUCHER.DISCOUNT_VALUE_REQUIRED)
    .isNumeric().withMessage(MESSAGES.VALIDATION.VOUCHER.DISCOUNT_VALUE_MUST_BE_NUMBER)
    .custom((value) => value > 0).withMessage(MESSAGES.VALIDATION.VOUCHER.DISCOUNT_VALUE_MUST_BE_POSITIVE),

  body("max_discount")
    .optional()
    .isNumeric().withMessage(MESSAGES.VALIDATION.VOUCHER.MAX_DISCOUNT_MUST_BE_NUMBER)
    .custom((value) => value > 0).withMessage(MESSAGES.VALIDATION.VOUCHER.MAX_DISCOUNT_MUST_BE_POSITIVE),

  body("min_order_value")
    .optional()
    .isNumeric().withMessage(MESSAGES.VALIDATION.VOUCHER.MIN_ORDER_VALUE_MUST_BE_NUMBER)
    .custom((value) => value >= 0).withMessage(MESSAGES.VALIDATION.VOUCHER.MIN_ORDER_VALUE_INVALID),

  body("max_uses")
    .optional()
    .isInt({ min: 1 }).withMessage(MESSAGES.VALIDATION.VOUCHER.MAX_USES_MUST_BE_NUMBER),

  body("max_uses_per_user")
    .optional()
    .isInt({ min: 1 }).withMessage(MESSAGES.VALIDATION.VOUCHER.MAX_USES_PER_USER_MUST_BE_NUMBER),

  body("start_date")
    .notEmpty().withMessage(MESSAGES.VALIDATION.VOUCHER.START_DATE_REQUIRED)
    .isISO8601().withMessage(MESSAGES.VALIDATION.VOUCHER.START_DATE_INVALID),

  body("end_date")
    .notEmpty().withMessage(MESSAGES.VALIDATION.VOUCHER.END_DATE_REQUIRED)
    .isISO8601().withMessage(MESSAGES.VALIDATION.VOUCHER.END_DATE_INVALID)
    .custom((value, { req }) => new Date(value) > new Date(req.body.start_date))
    .withMessage(MESSAGES.VALIDATION.VOUCHER.END_DATE_MUST_BE_AFTER_START_DATE)
];

const voucherIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.VOUCHER.ID_INVALID)
];

module.exports = { createVoucherValidator, voucherIdValidator };
