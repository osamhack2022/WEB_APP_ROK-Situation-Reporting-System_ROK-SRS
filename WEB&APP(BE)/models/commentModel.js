const mongoose = require("mongoose");

const commentModel = mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  Report: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Report"
  },
  Type: {
    type: String
  },
  Content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Comment = mongoose.model("Comment", commentModel);

module.exports = Comment;
