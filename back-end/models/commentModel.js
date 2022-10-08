const mongoose = require("mongoose");

const commentModel = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    report: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
    type: { type: String },
    content: {type: String, required: true }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentModel);

module.exports = Comment;
