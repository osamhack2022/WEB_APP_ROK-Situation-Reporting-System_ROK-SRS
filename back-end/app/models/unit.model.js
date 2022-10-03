const mongoose = require("mongoose");

const Unit = mongoose.model("Unit", new mongoose.Schema({ // 부대
    name: String, // 부대명
    Users: [ // 소속 부대원
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
  })
);

module.exports = Unit;
