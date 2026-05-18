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
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

permissionSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

module.exports = mongoose.model("Permission", permissionSchema);
