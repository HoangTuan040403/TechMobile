const { param } = require("express-validator");
const mongoose = require("mongoose");
const MESSAGES = require("../constants/messages");

const productIdValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage(MESSAGES.VALIDATION.PRODUCT.ID_INVALID)
];

module.exports = { productIdValidator };
