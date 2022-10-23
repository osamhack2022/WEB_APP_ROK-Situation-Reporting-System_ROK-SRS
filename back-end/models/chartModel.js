const mongoose = require("mongoose");

const chartModel = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Rank: {
    type: String,
    required: true
  },
  Unit: {
    type: String,
    required: true
  },
  Position: {
    type: String
  },
  DoDID: {
    type: String
  },
  Number: {
    type: String
  },
  MilNumber: {
    type: String
  },
  Email: {
    type: String
  },
  Parent: {
    type: String,
    default: null
  },
  Avatar: {
    type: String,
    required: false,
    default: "https://cdn-icons-png.flaticon.com/512/6142/6142226.png"
  },
}, {
  timestamps: true
});

const Chart = mongoose.model("Chart", chartModel);

module.exports = Chart;
