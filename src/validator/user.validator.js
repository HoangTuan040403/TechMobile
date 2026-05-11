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

const changePasswordValidator = [
  body("currentPassword")
    .notEmpty().withMessage(MESSAGES.VALIDATION.CURRENT_PASSWORD_REQUIRED),

  body("newPassword")
    .notEmpty().withMessage(MESSAGES.VALIDATION.NEW_PASSWORD_REQUIRED)
    .isLength({ min: 6 }).withMessage(MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH),

  body("confirmPassword")
    .notEmpty().withMessage(MESSAGES.VALIDATION.CONFIRM_PASSWORD_REQUIRED)
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error(MESSAGES.VALIDATION.PASSWORDS_NOT_MATCH);
      }
      return true;
    }),
];

module.exports = { updateMeValidator, changePasswordValidator };
