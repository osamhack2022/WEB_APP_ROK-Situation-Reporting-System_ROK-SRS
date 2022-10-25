const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const ReportM = require("../models/reportModel");

//@description     Create new Comment
//@route           POST /api/comment
//@access          Protected
const addComment = asyncHandler(async (req, res) => {
  const { ReportId, Type, Content } = req.body;

  if (!ReportId || !Type || !Content) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  const comment = await Comment.create({
    User: req.user._id,
    Type,
    Content,
    Report: ReportId,
  });

  const editReport = await ReportM.findByIdAndUpdate(
    ReportId,
    {
      $push: {
        Comments: comment,
      },
    },
    {
      new: true,
    }
  );

  if (comment && editReport) {
    res.status(201).send(comment);
  } else {
    res.status(400);
    throw new Error("오류");
  }
});

module.exports = {
  addComment,
};
