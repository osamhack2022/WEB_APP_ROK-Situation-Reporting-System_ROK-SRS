const asyncHandler = require("express-async-handler");
const Report = require("../models/reportModel");
const Reportsys = require("../models/reportModel");
const UnitM = require("../models/unitModel");
const UserM = require("../models/unitModel");
const getScore = require('../ai/classifier.js')
var mongoose = require('mongoose');

//@description     Create new report card
//@route           POST /api/report
//@access          Protected
const addReportCard = asyncHandler(async (req, res) => {
  const {
    Type,
    ReportingSystem,
    Invited,
    Content,
    Title
  } = req.body;

  if (!Type || !ReportingSystem || !Invited || !Content || !Title) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  User = req.user._id
  Severity = await getScore(Content)
  const report = await Report.create({
    User,
    Type,
    ReportingSystem,
    Invited,
    Content,
    Title,
    Severity
  });

  Unit = req.user.Unit;
  const editUnit = await UnitM.findByIdAndUpdate(
    Unit._id, {
      $push: {
        reportCards: report._id
      },
    }, {
      new: true,
    }
  )

  const editUser = await UserM.findByIdAndUpdate(
    req.user._id, {
      $push: {
        myReportCards: report._id
      },
    }, {
      new: true,
    }
  )

  if (editReport && editUnit && editUser) {
    res.status(201).json({
      _id: reportsys._id,
      Title: reportsys.Title,
      List: reportsys.List,
      Unit: reportsys.Unit
    });
  } else {
    res.status(400);
    throw new Error("오류");
  }
});

//@description     Delete reportsys
//@route           DELETE /api/reportsys
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
  console.log(Unit._id)
  const removed = await UnitM.findByIdAndUpdate(
    Unit._id, {
      $pull: {
        reportSys: mongoose.Types.ObjectId(_id)
      },
    }, {
      new: true,
    }
  )

  res.status(201).json({
    message: "remove success",
    _id: mongoose.Types.ObjectId(_id)
  });
});


//@description     get reportsys
//@route           GET /api/reportsys
//@access          Protected
const getReportsys = asyncHandler(async (req, res) => {
  const keyword = req.query.search;

  if (keyword) {
    ret = await Reportsys.find({
      Title: {
        $eq: keyword
      }
    }).find({
      Unit: {
        $eq: req.user.Unit
      }
    });
    return res.status(200).send(ret);
  } else {
    return res.status(200).send(await Reportsys.find({
      Unit: {
        $eq: req.user.Unit
      }
    }));
  }
});

module.exports = {
  addReportCard
};
