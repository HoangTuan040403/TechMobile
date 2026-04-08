const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

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
    ]
  },
  { timestamps: true }
);

categorySchema.index({ parent_id: 1 });
categorySchema.index({ ancestors: 1 });

module.exports = mongoose.model("Category", categorySchema);
