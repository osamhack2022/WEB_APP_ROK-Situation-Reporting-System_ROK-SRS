const asyncHandler = require("express-async-handler");
const Chart = require("../models/chartModel");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

//@description     Get organizational chart as array list
//@route           GET /api/chart
//@access          Protected
const getChart = asyncHandler(async (req, res) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer')) {
    res.status(401);
    throw new Error('토큰이 없거나 인증되지 않았습니다.');
  }

  try {
    const token = auth.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select("-password");
    const currentUnit = await currentUser.Unit?.Unitname;

    if (!currentUnit)
      throw new ReferenceError('사용자의 부대가 설정되지 않았습니다.');

    const unitOrganization = await Chart.find({ Unit: { $eq: currentUnit } });
    res.send(unitOrganization);
  }
  catch (error) {
    if(error === ReferenceError) {
      res.status(400);
      throw new Error(error);
    }

    res.status(401);
    throw new Error('잘못된 토큰입니다.');
  }
});

//@description     Add organizational chart
//@route           POST /api/chart/add
//@access          Protected
const addChart = asyncHandler(async (req, res) => {
  const {
    Name,
    Rank,
    Position,
    DoDID,
    Number,
    MilNumber,
    Email,
    Parent
  } = req.body;
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer')) {
    res.status(401);
    throw new Error('토큰이 없거나 인증되지 않았습니다.');
  }

  if (!Name || !Rank) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  try {
    const token = auth.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select("-password");
    const currentUnit = await currentUser.Unit?.Unitname;

    if (!currentUnit) {
      res.status(400);
      throw new Error('사용자의 부대가 설정되지 않았습니다.');
    }

    const newChart = Chart.create({
      Name,
      Rank,
      Position,
      DoDID,
      Number,
      MilNumber,
      Email,
      Parent,
      Unit: currentUnit
    });

    if (newChart) {
      res.status(201).json({
        Name,
        Rank,
        Position,
        DoDID,
        Number,
        MilNumber,
        Email,
        Parent,
        Unit: currentUnit
      })
    }
    else {
      res.send(400);
      throw new Error('조직도를 추가/수정할 수 없습니다.')
    }
  }
  catch (error) {
    res.status(401);
    throw new Error('잘못된 토큰입니다.');
  }
});

//@description     Edit organizational chart
//@route           POST /api/chart/edit
//@access          Protected
const editChart = asyncHandler(async (req, res) => {
  const {
    _id,
    Name,
    Rank,
    Position,
    DoDID,
    Number,
    MilNumber,
    Email,
    Parent
  } = req.body;
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer')) {
    res.status(401);
    throw new Error('토큰이 없거나 인증되지 않았습니다.');
  }

  if (!_id || !Name || !Rank) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  try {
    const token = auth.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select("-password");
    const currentUnit = await currentUser.Unit?.Unitname;

    if (!currentUnit) {
      res.status(400);
      throw new Error('사용자의 부대가 설정되지 않았습니다.');
    }

    const updatedChart = Chart.updateOne({ _id: _id }, {
      Name,
      Rank,
      Position,
      DoDID,
      Number,
      MilNumber,
      Email,
      Parent,
      Unit: currentUnit
    });

    if (updatedChart) {
      res.status(200).json({
        Name,
        Rank,
        Position,
        DoDID,
        Number,
        MilNumber,
        Email,
        Parent,
        Unit: currentUnit
      })
    }
    else {
      res.send(400);
      throw new Error('조직도를 추가/수정할 수 없습니다.')
    }
  }
  catch (error) {
    res.status(401);
    throw new Error('잘못된 토큰입니다.');
  }
});

//@description     Delete organizational chart
//@route           POST /api/chart/delete
//@access          Protected
const deleteChart = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer')) {
    res.status(401);
    throw new Error('토큰이 없거나 인증되지 않았습니다.');
  }

  if (!_id || !Name || !Rank) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  try {
    const token = auth.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select("-password");
    const currentUnit = await currentUser.Unit?.Unitname;

    if (!currentUnit) {
      res.status(400);
      throw new Error('사용자의 부대가 설정되지 않았습니다.');
    }

    const deleteChart = Chart.remove({ _id: _id });

    if (deleteChart) {
      res.status(200);
    }
    else {
      res.send(400);
      throw new Error('조직도를 추가/수정할 수 없습니다.')
    }
  }
  catch (error) {
    res.status(401);
    throw new Error('잘못된 토큰입니다.');
  }
});

module.exports = {
  getChart,
  addChart,
  editChart,
  deleteChart
};
