const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    body: String,

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
