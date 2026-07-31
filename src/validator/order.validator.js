const { body, param, query } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");
const { ORDER_STATUS } = require("../constants/order.constant");
const { PAGINATION } = require("../constants/pagination.constant");

const createOrderValidator = [
  body("address_id")
    .notEmpty().withMessage(MESSAGES.VALIDATION.ORDER.ADDRESS_ID_REQUIRED)
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ORDER.ADDRESS_ID_INVALID),

  body("note")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ORDER.NOTE_MUST_BE_STRING),

  body("voucher_code")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ORDER.VOUCHER_CODE_MUST_BE_STRING)
];

const orderIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ORDER.ID_INVALID)
];

const getOrdersValidator = [
  query("status")
    .optional()
    .isIn(Object.values(ORDER_STATUS))
    .withMessage(MESSAGES.VALIDATION.ORDER.STATUS_INVALID),

  query("user_id")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ORDER.USER_ID_INVALID),

  query("page")
    .optional()
    .isInt({ min: PAGINATION.MIN_PAGE })
    .withMessage(MESSAGES.VALIDATION.ORDER.PAGE_MUST_BE_POSITIVE),

  query("limit")
    .optional()
    .isInt({ min: PAGINATION.MIN_LIMIT, max: PAGINATION.MAX_LIMIT })
    .withMessage(MESSAGES.VALIDATION.ORDER.LIMIT_INVALID)
];

const updateOrderStatusValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ORDER.ID_INVALID),

  body("status")
    .notEmpty().withMessage(MESSAGES.VALIDATION.ORDER.STATUS_REQUIRED)
    .isIn(Object.values(ORDER_STATUS))
    .withMessage(MESSAGES.VALIDATION.ORDER.STATUS_INVALID)
];

const createOrderByAdminValidator = [
  body("user_id")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ORDER.USER_ID_INVALID),

  body("guest_name")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ORDER.GUEST_NAME_MUST_BE_STRING),

  body("guest_phone")
    .optional()
    .matches(/^[0-9]{9,11}$/).withMessage(MESSAGES.VALIDATION.ORDER.GUEST_PHONE_INVALID),

  body().custom((value) => {
    if (!value.user_id && (!value.guest_name || !value.guest_phone)) {
      throw new Error(MESSAGES.VALIDATION.ORDER.USER_OR_GUEST_REQUIRED);
    }
    return true;
  }),

  body("note")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ORDER.NOTE_MUST_BE_STRING),

  body("items")
    .notEmpty().withMessage(MESSAGES.VALIDATION.ORDER.ITEMS_REQUIRED)
    .isArray({ min: 1 }).withMessage(MESSAGES.VALIDATION.ORDER.ITEMS_MUST_BE_ARRAY),

  body("items.*.variant_id")
    .notEmpty().withMessage(MESSAGES.VALIDATION.ORDER.VARIANT_ID_REQUIRED)
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ORDER.VARIANT_ID_INVALID),

  body("items.*.quantity")
    .notEmpty().withMessage(MESSAGES.VALIDATION.ORDER.QUANTITY_REQUIRED)
    .isInt({ min: 1 }).withMessage(MESSAGES.VALIDATION.ORDER.QUANTITY_INVALID)
];

module.exports = { createOrderValidator, orderIdValidator, getOrdersValidator, updateOrderStatusValidator, createOrderByAdminValidator };
