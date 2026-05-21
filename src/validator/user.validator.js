const { body } = require("express-validator");
const MESSAGES = require("../constants/messages");

const updateMeValidator = [
  body("name")
    .optional()
    .notEmpty().withMessage(MESSAGES.VALIDATION.AUTH.NAME_REQUIRED),

  body("phone")
    .optional()
    .matches(/^[0-9]{9,11}$/).withMessage(MESSAGES.VALIDATION.AUTH.PHONE_INVALID),

  body("address")
    .optional()
    .notEmpty().withMessage(MESSAGES.VALIDATION.AUTH.ADDRESS_INVALID),
];

const changePasswordValidator = [
  body("currentPassword")
    .notEmpty().withMessage(MESSAGES.VALIDATION.AUTH.CURRENT_PASSWORD_REQUIRED),

  body("newPassword")
    .notEmpty().withMessage(MESSAGES.VALIDATION.AUTH.NEW_PASSWORD_REQUIRED)
    .isLength({ min: 6 }).withMessage(MESSAGES.VALIDATION.AUTH.PASSWORD_MIN_LENGTH),

  body("confirmPassword")
    .notEmpty().withMessage(MESSAGES.VALIDATION.AUTH.CONFIRM_PASSWORD_REQUIRED)
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error(MESSAGES.VALIDATION.AUTH.PASSWORDS_NOT_MATCH);
      }
      return true;
    }),
];

module.exports = { updateMeValidator, changePasswordValidator };
