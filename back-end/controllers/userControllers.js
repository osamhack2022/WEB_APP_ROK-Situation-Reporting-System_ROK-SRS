const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Protected
const allUsers = asyncHandler(async (req, res) => {

  const keyword = req.query.search
    ? {
        $or: [
          { Name: { $regex: req.query.search, $options: "i" } },
          { DoDID: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  if (req.query.search == "") {
    users = await User.find({}, {password:0});
  } else {
    users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  }
  res.send(users);
});

//@description     Add new user
//@route           POST /api/user/add
//@access          Protected
const addUser = asyncHandler(async (req, res) => {
  const { Rank, Name, DoDID, Type } = req.body;

  if (!Rank || !Name || !DoDID || !Type) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  const userExists = await User.findOne({ DoDID });

  if (userExists) {
    res.status(400);
    throw new Error("이미 등록된 사용자입니다.");
  }

  Invcode = Math.random().toString(36).substring(2,10);
  Unit = req.user.Unit;

  const user = await User.create({
    Name,
    DoDID,
    Rank,
    Type,
    Invcode,
    Unit
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      Name: user.Name,
      Rank: user.Rank,
      DoDID: user.DoDID,
      Type: user.Type,
      Invcode: user.Invcode,
      Unit: user.Unit
    });
  } else {
    res.status(400);
    throw new Error("사용자를 찾을 수 없습니다.");
  }
});

//@description     Register new user
//@route           POST /api/user/register
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { Rank, Name, DoDID, email, password, pic, Invcode } = req.body;

  if (!Rank || !Name || !email || !password || !DoDID) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  const userDb = await User.findOne({ DoDID });

  if (!userDb) {
    res.status(400);
    throw new Error("등록되지 않은 사용자입니다. 부대 당담자에게 문의하세요.");
  }

  if (userDb.is_registered) {
    res.status(400);
    throw new Error("이미 등록된 사용자입니다.");
  }

  if (Invcode != userDb.Invcode) {
    res.status(400);
    throw new Error("초대코드가 틀립니다.");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userDb._id,
    {
      email: email,
      password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      pic: pic,
      is_registered: true
    },
    {
      new: true,
    }
  )

  if (!updatedUser) {
    res.status(400);
    throw new Error("사용자를 찾을 수 없습니다.");
  } else {
    res.status(201).json({
      _id: updatedUser._id,
      Name: updatedUser.Name,
      Rank: updatedUser.Rank,
      DoDID: updatedUser.DoDID,
      email: updatedUser.email,
      Type: updatedUser.Type,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { DoDID, password } = req.body;
  const user = await User.findOne({ DoDID });
  if (user && !user.is_registered) {
    res.status(400);
    throw new Error("승인된 사용자이나 아직 등록되지 않았습니다. 계정 등록 후 이용해주세요.");
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      Name: user.Name,
      Rank: user.Rank,
      DoDID: user.DoDID,
      email: user.email,
      Type: user.Type,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("군번이나 비밀번호가 틀렸습니다.");
  }
});

//@description     Register new user
//@route           POST /api/user/register
//@access          Public
const updateUser = asyncHandler(async (req, res) => {
  const { Rank, Name, email, milNumber, number } = req.body;

  if (!Rank && !Name && !email && !milNumber && !number) {
    res.status(400);
    throw new Error("수정할 정보를 입력하세요.");
  }

  const DoDID = req.user.DoDID;
  const userDb = await User.findOne({ DoDID });

  if (!userDb) {
    res.status(400);
    throw new Error("등록되지 않은 사용자입니다. 부대 당담자에게 문의하세요.");
  }

  if (!userDb.is_registered) {
    res.status(400);
    throw new Error("가입 후 시도하세요.");
  }

  const noData = "";
  const updatedUser = await User.findByIdAndUpdate(
    userDb._id,
    {
      Rank: Rank != noData ? Rank : userDb.Rank,
      Name: Name != noData ? Name : userDb.Name,
      email: email != noData ? email : userDb.email,
      milNumber: milNumber != noData ? milNumber : userDb.milNumber,
      number: number != noData ? number : userDb.number
    },
    {
      new: true,
    }
  )

  if (!updatedUser) {
    res.status(400);
    throw new Error("사용자를 찾을 수 없습니다.");
  } else {
    res.status(201).json({
      _id: updatedUser._id,
      Name: updatedUser.Name,
      Rank: updatedUser.Rank,
      DoDID: updatedUser.DoDID,
      email: updatedUser.email,
      milNumber: updatedUser.milNumber,
      number: updatedUser.number,
      Type: updatedUser.Type,
      pic: updatedUser.pic,
    });
  }
});

module.exports = { allUsers, addUser, registerUser, authUser, updateUser };
