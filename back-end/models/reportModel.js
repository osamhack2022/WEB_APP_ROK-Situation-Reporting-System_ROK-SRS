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
  Receiver: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  Invited: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  ReportingSystem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reportsys"
  }],
  Content: {
    type: String
  },
  Comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  Severity: {
    type: String,
    required: true,
    trim: true
  },
  Unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit"
  }
}, {
  timestamps: true
});

const Report = mongoose.model("Report", reportModel);

module.exports = Report;
