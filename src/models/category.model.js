const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },

    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null
    },

    ancestors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ],

    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

categorySchema.index({ parent_id: 1 });
categorySchema.index({ ancestors: 1 });
categorySchema.index({ deletedAt: 1 });

categorySchema.pre(/^find/, function (next) {
  this.where({ deletedAt: null });
  next();
});

module.exports = mongoose.model("Category", categorySchema);
