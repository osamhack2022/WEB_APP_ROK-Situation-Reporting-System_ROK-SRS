const mongoose = require("mongoose");

const reportsysModel = mongoose.Schema({
	Title: {
		type: String
	},
	List: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	Unit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Unit"
	}
}, {
	timestamps: true
});

const Reportsys = mongoose.model("Reportsys", reportsysModel);

module.exports = Reportsys;
