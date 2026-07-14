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
    .optional()
    .isNumeric().withMessage(MESSAGES.VALIDATION.VOUCHER.DISCOUNT_VALUE_MUST_BE_NUMBER)
    .custom((value, { req }) => {
      if (req.body.discount_type === DISCOUNT_TYPE.PERCENTAGE) {
        return value > 0 && value <= 100;
      }
      return value > 0;
    })
    .withMessage(MESSAGES.VALIDATION.VOUCHER.DISCOUNT_VALUE_INVALID),

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

const updateVoucherValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.VOUCHER.ID_INVALID),

  body("code")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.VOUCHER.CODE_MUST_BE_STRING),

  body("discount_type")
    .optional()
    .isIn(Object.values(DISCOUNT_TYPE)).withMessage(MESSAGES.VALIDATION.VOUCHER.DISCOUNT_TYPE_INVALID),

  body("discount_value")
    .optional()
    .isNumeric().withMessage(MESSAGES.VALIDATION.VOUCHER.DISCOUNT_VALUE_MUST_BE_NUMBER)
    .custom((value, { req }) => {
      if (req.body.discount_type === DISCOUNT_TYPE.PERCENTAGE) {
        return value > 0 && value <= 100;
      }
      return value > 0;
    })
    .withMessage(MESSAGES.VALIDATION.VOUCHER.DISCOUNT_VALUE_INVALID),

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
    .optional()
    .isISO8601().withMessage(MESSAGES.VALIDATION.VOUCHER.START_DATE_INVALID),

  body("end_date")
    .optional()
    .isISO8601().withMessage(MESSAGES.VALIDATION.VOUCHER.END_DATE_INVALID)
    .custom((value, { req }) => {
      const startDate = req.body.start_date || new Date();
      return new Date(value) > new Date(startDate);
    })
    .withMessage(MESSAGES.VALIDATION.VOUCHER.END_DATE_MUST_BE_AFTER_START_DATE),

  body("isActive")
    .optional()
    .isBoolean().withMessage(MESSAGES.VALIDATION.VOUCHER.IS_ACTIVE_MUST_BE_BOOLEAN)
];

module.exports = { createVoucherValidator, voucherIdValidator, updateVoucherValidator };
