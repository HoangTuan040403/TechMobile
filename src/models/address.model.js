const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    full_name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{9,11}$/, "Invalid phone number"]
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    is_default: {
      type: Boolean,
      default: false
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

addressSchema.index({ user_id: 1 });
addressSchema.index({ deletedAt: 1 });

addressSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

module.exports = mongoose.model("Address", addressSchema);
