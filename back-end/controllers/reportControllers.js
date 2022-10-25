const asyncHandler = require("express-async-handler");
const Report = require("../models/reportModel");
const Reportsys = require("../models/reportsysModel");
const UnitM = require("../models/unitModel");
const UserM = require("../models/userModel");
const Comment = require('../models/commentModel');
const getScore = require('../ai/classifier.js')

//@description     Get all report cards
//@route           GET /api/report?sender=?receiver=
//@access          Protected
const getReportCard = asyncHandler(async (req, res) => {
  const { sender, receiver } = req.query;

  const currentUser = req.user;
  let reportCards;
  if (receiver) {
    reportCards = await Report.find({ Receiver: currentUser._id });
  }
  else if (sender) {
    reportCards = await Report.find({ User: currentUser._id });
  }
  else {
    reportCards = await Report.find({});
  }

  for (const card of reportCards) {
    card.User = await UserM.findById(card.User).select("-password");
    for(const systemIndex in card.ReportingSystem) {
      card.ReportingSystem[systemIndex] = await Reportsys.findById(card.ReportingSystem[systemIndex]);
      for(const commentIndex in card.Comments) {
        card.Comments[commentIndex] = await Comment.findById(card.Comments[commentIndex]);
        if(card.Comments[commentIndex])
          card.Comments[commentIndex].User = await UserM.findById(card.Comments[commentIndex].User).select("-password");
      }
    }
  }
  
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
  } = req.body;

  if (!Type || !ReportingSystem || !Invited || !Content || !Title) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  const currentUser = req.user;
  let currentUnit = currentUser.Unit;
  let Severity = await getScore(Content);
  const Receiver = [...Invited];
  const systemList = await Reportsys.find({ _id: { '$in': ReportingSystem } });
  for (const system of systemList)
    Receiver.push(system.List[0]._id);
  const report = await Report.create({
    User: currentUser,
    Type,
    ReportingSystem,
    Invited,
    Receiver,
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
