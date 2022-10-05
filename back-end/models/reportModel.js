const mongoose = require("mongoose");

const reportModel = mongoose.Schema(
  {    
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reportName: { type: String, required: true, trim: true },
    content: { type: String },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    type: { type: String },
    state: { type: String, default: "open"}, // open || close
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportModel);

module.exports = Report;
