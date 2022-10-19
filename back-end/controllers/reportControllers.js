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
  Unit = req.user.Unit._id;
  Severity = await getScore(Content)
  const report = await Report.create({
    User,
    Type,
    ReportingSystem,
    Invited,
    Content,
    Title,
    Severity,
    Unit
  });

  const editUnit = await UnitM.findByIdAndUpdate(
    Unit, {
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
    res.status(201).send(report);
  } else {
    res.status(400);
    throw new Error("오류");
  }
});

module.exports = {
  addReportCard
};
