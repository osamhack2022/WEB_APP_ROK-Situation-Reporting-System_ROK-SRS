const mongoose = require("mongoose");

const reportModel = mongoose.Schema(
  {
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Type: { type: String },
    Status: { type: String },
    Invited: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    ReportingSystem: { type: String },
    ReportName: { type: String, required: true, trim: true },
    Content: { type: String },
    Comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportModel);

module.exports = Report;
