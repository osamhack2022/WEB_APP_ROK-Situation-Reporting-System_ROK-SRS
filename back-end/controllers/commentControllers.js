const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const ReportM = require("../models/reportModel");

//@description     Create new Comment
//@route           POST /api/comment
//@access          Protected
const addComment = asyncHandler(async (req, res) => {
  const { Type, Content, Title } = req.body;

  if (!Type || !Content || !Title) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  User = req.user._id;

  report = await Report.find({ Title: { $eq: keyword } }).find({
    Unit: { $eq: req.user.Unit },
  });

  Report = report._id;

  const comment = await Comment.create({
    User,
    Type,
    Content,
    report,
  });

  const editReport = await ReportM.findByIdAndUpdate(
    report._id,
    {
      $push: {
        Comments: comment,
      },
    },
    {
      new: true,
    }
  );

  if (editReport && editUnit && editUser) {
    res.status(201).send(comment);
  } else {
    res.status(400);
    throw new Error("오류");
  }
});

module.exports = {
  addComment,
};
