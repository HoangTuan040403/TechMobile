const { body, param } = require("express-validator");
const MESSAGES = require("../constants/messages");
const mongoose = require("mongoose");

const createRoleValidator = [
  body("name")
    .notEmpty().withMessage(MESSAGES.VALIDATION.ROLE.NAME_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.ROLE.NAME_MUST_BE_STRING),

  body("description")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ROLE.DESCRIPTION_MUST_BE_STRING),

  body("permissions")
    .optional()
    .isArray().withMessage(MESSAGES.VALIDATION.ROLE.PERMISSIONS_MUST_BE_ARRAY)
    .custom((values) => values.every((v) => mongoose.Types.ObjectId.isValid(v)))
    .withMessage(MESSAGES.VALIDATION.ROLE.PERMISSION_ID_INVALID)
];

const getRoleByIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ROLE.ID_REQUIRED)
];

const updateRoleValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.ROLE.ID_INVALID),

  body("name")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ROLE.NAME_MUST_BE_STRING),

  body("description")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ROLE.DESCRIPTION_MUST_BE_STRING),

  body("permissions")
    .optional()
    .isArray().withMessage(MESSAGES.VALIDATION.ROLE.PERMISSIONS_MUST_BE_ARRAY)
    .custom((values) => values.every((v) => mongoose.Types.ObjectId.isValid(v)))
    .withMessage(MESSAGES.VALIDATION.ROLE.PERMISSION_ID_INVALID),

  body("isActive")
    .optional()
    .isBoolean().withMessage(MESSAGES.VALIDATION.ROLE.IS_ACTIVE_MUST_BE_BOOLEAN)
];

module.exports = { createRoleValidator, getRoleByIdValidator, updateRoleValidator };
