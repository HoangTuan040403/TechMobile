const { body } = require("express-validator");
const MESSAGES = require("../constants/messages");

const registerValidator = [
  body("name")
    .notEmpty().withMessage(MESSAGES.VALIDATION.NAME_REQUIRED),

  body("email")
    .notEmpty().withMessage(MESSAGES.VALIDATION.EMAIL_REQUIRED)
    .isEmail().withMessage(MESSAGES.VALIDATION.EMAIL_INVALID),

  body("password")
    .notEmpty().withMessage(MESSAGES.VALIDATION.PASSWORD_REQUIRED)
    .isLength({ min: 6 }).withMessage(MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH),

  body("phone")
    .optional()
    .matches(/^[0-9]{9,11}$/).withMessage(MESSAGES.VALIDATION.PHONE_INVALID),
];

module.exports = { registerValidator };
