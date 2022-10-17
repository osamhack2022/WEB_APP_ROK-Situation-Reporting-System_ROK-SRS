const asyncHandler = require("express-async-handler");
const Reportsys = require("../models/reportsysModel");
const Unit = require("../models/unitModel");

//@description     Create new reportsys
//@route           POST /api/reportsys/
//@access          Protected(onlyadmin)
const addReportsys = asyncHandler(async (req, res) => {
	const { Title, List } = req.body;

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
	  throw new Error("사용자를 찾을 수 없습니다.");
	}
  });

module.exports = {
	addReportsys
};
