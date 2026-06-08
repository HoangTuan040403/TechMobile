const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");

const createAddressValidator = [
  body("full_name")
    .notEmpty().withMessage(MESSAGES.VALIDATION.ADDRESS.FULL_NAME_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.ADDRESS.FULL_NAME_MUST_BE_STRING),

  body("phone")
    .notEmpty().withMessage(MESSAGES.VALIDATION.ADDRESS.PHONE_REQUIRED)
    .matches(/^[0-9]{9,11}$/).withMessage(MESSAGES.VALIDATION.ADDRESS.PHONE_INVALID),

  body("address")
    .notEmpty().withMessage(MESSAGES.VALIDATION.ADDRESS.ADDRESS_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.ADDRESS.ADDRESS_MUST_BE_STRING),

  body("is_default")
    .optional()
    .isBoolean().withMessage(MESSAGES.VALIDATION.ADDRESS.IS_DEFAULT_MUST_BE_BOOLEAN)
];

const addressIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ADDRESS.ID_INVALID)
];

const updateAddressValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ADDRESS.ID_INVALID),

  body("full_name")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ADDRESS.FULL_NAME_MUST_BE_STRING),

  body("phone")
    .optional()
    .matches(/^[0-9]{9,11}$/).withMessage(MESSAGES.VALIDATION.ADDRESS.PHONE_INVALID),

  body("address")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ADDRESS.ADDRESS_MUST_BE_STRING),

  body("is_default")
    .optional()
    .isBoolean().withMessage(MESSAGES.VALIDATION.ADDRESS.IS_DEFAULT_MUST_BE_BOOLEAN)
];

module.exports = { createAddressValidator, addressIdValidator, updateAddressValidator };
