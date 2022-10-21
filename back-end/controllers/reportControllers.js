const asyncHandler = require("express-async-handler");
const Report = require("../models/reportModel");
const Reportsys = require("../models/reportModel");
const UnitM = require("../models/unitModel");
const UserM = require("../models/userModel");
const getScore = require('../ai/classifier.js')
var mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//@description     Get report cards
//@route           GET /api/report?index=
//@access          Protected
const getReportCard = asyncHandler(async (req, res) => {
  const { index } = req.query;

  if (!index) {
    res.status(400);
    throw new Error("잘못된 요청입니다.");
  }

  let reportCards = await new Report({}, { password: 0 });
  res.send(reportCards.at(index));
});

//@description     Create new report card
//@route           POST /api/report
//@access          Protected
const addReportCard = asyncHandler(async (req, res) => {
  const {
    Type,
    ReportingSystem,
    Invited,
    Content,
    Title,
    UserToken
  } = req.body;

  if (!Type || !ReportingSystem || !Invited || !Content || !Title) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  //decodes token id
  const decoded = jwt.verify(UserToken, process.env.JWT_SECRET);
  const currentUser = await UserM.findById(decoded.id).select("-password");

  let currentUnit = currentUser.Unit
  let Severity = await getScore(Content)
  const report = await Report.create({
    User: currentUser,
    Type,
    ReportingSystem,
    Invited,
    Content,
    Title,
    Severity,
    Unit: currentUnit
  });


  res.status(201).send(report);
  return;

  const editUnit = await UnitM.findByIdAndUpdate(
    UnitId, {
    $push: {
      reportCards: report._id
    },
  }, {
    new: true,
  }
  )

  const editUser = await UserM.findByIdAndUpdate(
    UserId, {
    $push: {
      myReportCards: report._id
    },
  }, {
    new: true,
  }
  )

  if (editUnit && editUser) {
    res.status(201).send(report);
  } else {
    res.status(400);
    throw new Error("오류");
  }
});

module.exports = {
  addReportCard,
  getReportCard
};
