const { body, param } = require("express-validator");
const MESSAGES = require("../constants/messages");

const createCategoryValidator = [
  body("name")
    .notEmpty().withMessage(MESSAGES.VALIDATION.CATEGORY.NAME_REQUIRED)
    .isString().withMessage(MESSAGES.VALIDATION.CATEGORY.NAME_MUST_BE_STRING)
    .trim(),

  body("slug")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.CATEGORY.SLUG_MUST_BE_STRING)
    .isSlug().withMessage(MESSAGES.VALIDATION.CATEGORY.SLUG_INVALID)
    .trim(),

  body("parent_id")
    .optional({ nullable: true })
    .isMongoId().withMessage(MESSAGES.VALIDATION.CATEGORY.PARENT_ID_INVALID)
];

const getCategoryByIdValidator = [
  param("id")
    .notEmpty().withMessage(MESSAGES.VALIDATION.CATEGORY.ID_REQUIRED)
    .isMongoId().withMessage(MESSAGES.VALIDATION.CATEGORY.ID_INVALID),
];

const updateCategoryValidator = [
  param("id")
    .notEmpty().withMessage(MESSAGES.VALIDATION.CATEGORY.ID_REQUIRED)
    .isMongoId().withMessage(MESSAGES.VALIDATION.CATEGORY.ID_INVALID),

  body("name")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.CATEGORY.NAME_MUST_BE_STRING)
    .notEmpty().withMessage(MESSAGES.VALIDATION.CATEGORY.NAME_REQUIRED)
    .trim(),

  body("slug")
    .optional()
    .isString().withMessage(MESSAGES.VALIDATION.CATEGORY.SLUG_MUST_BE_STRING)
    .isSlug().withMessage(MESSAGES.VALIDATION.CATEGORY.SLUG_INVALID)
    .trim(),

  body("parent_id")
    .optional({ nullable: true })
    .isMongoId().withMessage(MESSAGES.VALIDATION.CATEGORY.PARENT_ID_INVALID),

  body()
    .custom((_, { req }) => {
      const allowed = ["name", "slug", "parent_id"];
      const hasField = allowed.some((key) => key in req.body);
      if (!hasField) throw new Error(MESSAGES.VALIDATION.CATEGORY.AT_LEAST_ONE_FIELD);
      return true;
    })
];

module.exports = { createCategoryValidator, getCategoryByIdValidator, updateCategoryValidator };
