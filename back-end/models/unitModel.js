const mongoose = require("mongoose");

const unitModel = mongoose.Schema(
  {
    name: { type: String, trim: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    orgChart: { type: String, required: true },    
    logo: {
      type: "String",
      required: false,
      default:
        "https://i.imgur.com/rnJLXCo.png",
    },
    unitAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }]
  },
  { timestamps: true }
);

const Unit = mongoose.model("Unit", unitModel);

module.exports = Unit;
