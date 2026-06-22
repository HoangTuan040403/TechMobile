const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");

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

module.exports = { createOrderValidator, orderIdValidator };
