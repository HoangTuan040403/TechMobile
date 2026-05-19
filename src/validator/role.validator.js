const { body } = require("express-validator");
const MESSAGES = require("../constants/messages");
const mongoose = require("mongoose");

const createRoleValidator = [
  body("name")
    .notEmpty().withMessage(MESSAGES.VALIDATION.ROLE_NAME_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.ROLE_NAME_MUST_BE_STRING),

  body("description")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.ROLE_DESCRIPTION_MUST_BE_STRING),

  body("permissions")
    .optional()
    .isArray().withMessage(MESSAGES.VALIDATION.ROLE_PERMISSIONS_MUST_BE_ARRAY)
    .custom((values) => values.every((v) => mongoose.Types.ObjectId.isValid(v)))
    .withMessage(MESSAGES.VALIDATION.ROLE_PERMISSION_ID_INVALID)
];

module.exports = { createRoleValidator };
