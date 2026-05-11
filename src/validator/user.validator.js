const { body } = require("express-validator");
const MESSAGES = require("../constants/messages");

const updateMeValidator = [
  body("name")
    .optional()
    .notEmpty().withMessage(MESSAGES.VALIDATION.NAME_REQUIRED),

  body("phone")
    .optional()
    .matches(/^[0-9]{9,11}$/).withMessage(MESSAGES.VALIDATION.PHONE_INVALID),

  body("address")
    .optional()
    .notEmpty().withMessage(MESSAGES.VALIDATION.ADDRESS_INVALID),
];

module.exports = { updateMeValidator };
