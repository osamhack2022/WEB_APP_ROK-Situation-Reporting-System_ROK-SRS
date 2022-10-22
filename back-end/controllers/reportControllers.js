const asyncHandler = require("express-async-handler");
const Report = require("../models/reportModel");
const Reportsys = require("../models/reportModel");
const UnitM = require("../models/unitModel");
const UserM = require("../models/userModel");
const getScore = require('../ai/classifier.js')
var mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

//@description     Get all report cards
//@route           GET /api/report
//@access          Protected
const getReportCard = asyncHandler(async (req, res) => {

  let reportCards = await Report.find({});
  res.send(reportCards);
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
