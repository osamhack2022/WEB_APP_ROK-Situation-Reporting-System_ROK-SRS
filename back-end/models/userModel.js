const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    dodid: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    rank: { type: "String", required: true },
    invcode: { type: "String", required: true },
    email: { type: "String", unique: true, required: false },
    milnumber: { type: "String", required: false },
    number: { type: "String", unique: true, required: false },
    pic: {
      type: "String",
      required: false,
      default:
        "https://cdn-icons-png.flaticon.com/512/6142/6142226.png",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

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
