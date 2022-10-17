const asyncHandler = require("express-async-handler");
const Reportsys = require("../models/reportsysModel");

//@description     Create new reportsys
//@route           POST /api/reportsys/
//@access          Protected(onlyadmin)
const addReportsys = asyncHandler(async (req, res) => {
	const {
		Title,
		List
	} = req.body;

	if (!Title || !List) {
		res.status(400);
		throw new Error("모든 정보를 입력하세요.");
	}

	Unit = req.user.Unit;

	const reportsys = await Reportsys.create({
		Title,
		List,
		Unit
	});

	if (reportsys) {
		res.status(201).json({
			_id: reportsys._id,
			Title: reportsys.Title,
			List: reportsys.List,
			Unit: reportsys.Unit
		});
	} else {
		res.status(400);
		throw new Error("보고체계를 찾을 수 없습니다.");
	}
});

//@description     Delete reportsys
//@route           DELETE /api/reportsys/
//@access          Protected(onlyadmin)
const removeReportsys = asyncHandler(async (req, res) => {
	const {
		_id
	} = req.body;

	if (!_id) {
		res.status(400);
		throw new Error("정보를 입력하세요.");
	}

	Unit = req.user.Unit;

	try {
		await Reportsys.findByIdAndRemove(_id).exec();
	} catch (e) {
		res.status(400);
		throw new Error("해당 보고체계가 없습니다.");
	}
	Unit.reportSys.findByIdAndRemove(_id);

	console.log(Unit.reportSys);

	res.status(201).json({
		message: "remove success",
		_id: reportsys._id,
		Title: reportsys.Title
	});
});

module.exports = {
	addReportsys,
	removeReportsys
};
