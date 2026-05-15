const { body } = require("express-validator");
const MESSAGES = require("../constants/messages");

const createCategoryValidator = [
  body("name")
    .notEmpty().withMessage(MESSAGES.VALIDATION.CATEGORY_NAME_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.CATEGORY_NAME_MUST_BE_STRING)
    .trim(),

  body("slug")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.CATEGORY_SLUG_MUST_BE_STRING)
    .isSlug().withMessage(MESSAGES.VALIDATION.CATEGORY_SLUG_INVALID)
    .trim(),

  body("parent_id")
    .optional({ nullable: true })
    .isMongoId().withMessage(MESSAGES.VALIDATION.CATEGORY_PARENT_ID_INVALID)
];

module.exports = { createCategoryValidator };
