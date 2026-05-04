const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    description: {
      type: String,
      trim: true
    },

    module: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", permissionSchema);
