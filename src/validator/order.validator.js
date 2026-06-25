const { body, param, query } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");
const { ORDER_STATUS } = require("../constants/order.constant");
const { PAGINATION } = require("../constants/pagination.constant");

const createOrderValidator = [
  body("address_id")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ORDER.ADDRESS_ID_INVALID),

  body("note")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ORDER.NOTE_MUST_BE_STRING)
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

module.exports = { createOrderValidator, orderIdValidator, getOrdersValidator, updateOrderStatusValidator };
