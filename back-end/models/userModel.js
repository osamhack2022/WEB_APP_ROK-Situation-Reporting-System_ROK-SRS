const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  DoDID: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: false,
    default: " "
  },
  Rank: {
    type: String,
    required: true
  },
  Role: {
    type: String,
  },
  Type: {
    type: String,
    required: true
  },
  Invcode: {
    type: String,
    required: true
  },
  is_activated: {
    type: Boolean
  },
  Position: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  milNumber: {
    type: String,
    required: false
  },
  number: {
    type: String,
    required: false
  },
  pic: {
    type: String,
    required: false,
    default: "https://cdn-icons-png.flaticon.com/512/6142/6142226.png"
  },
  Unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit"
  },
  is_registered: {
    type: Boolean,
    default: false,
  },
  myReportCards :[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "report"
  }]
}, {
  timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
