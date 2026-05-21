const { body } = require("express-validator");
const MESSAGES = require("../constants/messages");

const registerValidator = [
  body("name")
    .notEmpty().withMessage(MESSAGES.VALIDATION.AUTH.NAME_REQUIRED),

  body("email")
    .notEmpty().withMessage(MESSAGES.VALIDATION.AUTH.EMAIL_REQUIRED)
    .isEmail().withMessage(MESSAGES.VALIDATION.AUTH.EMAIL_INVALID),

  body("password")
    .notEmpty().withMessage(MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED)
    .isLength({ min: 6 }).withMessage(MESSAGES.VALIDATION.AUTH.PASSWORD_MIN_LENGTH),

  body("phone")
    .optional()
    .matches(/^[0-9]{9,11}$/).withMessage(MESSAGES.VALIDATION.AUTH.PHONE_INVALID),
];

const loginValidator = [
  body("email")
    .notEmpty().withMessage(MESSAGES.VALIDATION.AUTH.EMAIL_REQUIRED)
    .isEmail().withMessage(MESSAGES.VALIDATION.AUTH.EMAIL_INVALID),

  body("password")
    .notEmpty().withMessage(MESSAGES.VALIDATION.AUTH.PASSWORD_REQUIRED)
];

module.exports = { registerValidator, loginValidator };
