const { body, param } = require("express-validator");
const mongoose = require("mongoose");
const Messages = require("../constants/messages");

const createPermissionValidator = [
  body("name")
    .notEmpty().withMessage(Messages.VALIDATION.PERMISSION_NAME_REQUIRED)
    .isString().withMessage(Messages.VALIDATION.PERMISSION_NAME_MUST_BE_STRING),

  body("description")
    .optional()
    .isString().withMessage(Messages.VALIDATION.PERMISSION_DESCRIPTION_MUST_BE_STRING),

  body("module")
    .notEmpty().withMessage(Messages.VALIDATION.PERMISSION_MODULE_REQUIRED)
    .isString().withMessage(Messages.VALIDATION.PERMISSION_MODULE_MUST_BE_STRING)
];

const getPermissionByIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(Messages.VALIDATION.PERMISSION_ID_INVALID)
];

module.exports = { createPermissionValidator, getPermissionByIdValidator };
