const mongoose = require("mongoose");

const reportModel = mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  Title: {
    type: String,
    required: true,
    trim: true
  },
  Type: {
    type: String
  },
  Status: {
    type: String,
    default: "Unresolved"
  },
  Invited: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  ReportingSystem: [{
    type: String
  }],
  Content: {
    type: String
  },
  Comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  Severity: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true
});

const Report = mongoose.model("Report", reportModel);

module.exports = Report;
