const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");

const createPermissionValidator = [
  body("name")
    .notEmpty().withMessage(MESSAGES.VALIDATION.PERMISSION_NAME_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.PERMISSION_NAME_MUST_BE_STRING),

  body("description")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.PERMISSION_DESCRIPTION_MUST_BE_STRING),

  body("module")
    .notEmpty().withMessage(MESSAGES.VALIDATION.PERMISSION_MODULE_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.PERMISSION_MODULE_MUST_BE_STRING)
];

const getPermissionByIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PERMISSION_ID_INVALID)
];

const updatePermissionValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PERMISSION_ID_INVALID),

  body("name")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.PERMISSION_NAME_MUST_BE_STRING),

  body("description")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.PERMISSION_DESCRIPTION_MUST_BE_STRING),

  body("module")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.PERMISSION_MODULE_MUST_BE_STRING),

  body("isActive")
    .optional()
    .isBoolean().withMessage(MESSAGES.VALIDATION.PERMISSION_IS_ACTIVE_MUST_BE_BOOLEAN)
];

module.exports = { createPermissionValidator, getPermissionByIdValidator, updatePermissionValidator };
