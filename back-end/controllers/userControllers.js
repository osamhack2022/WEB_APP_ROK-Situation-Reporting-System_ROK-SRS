const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { dodId: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { rank, name, dodId, email, password, pic, invCode } = req.body;

  if (!name || !email || !password || !dodId) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ dodId });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (invCode != "1234") { // hard code, Todo: 초대코드를 어떻게 생성/관리할지 논의 후 수정
    res.status(400);
    throw new Error("Invalid invite code");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    dodId,
    rank
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      rank: user.rank,
      dodId: user.dodId,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { dodId, password } = req.body;

  const user = await User.findOne({ dodId });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      dodId: dodId,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid dodId or Password");
  }
});

module.exports = { allUsers, registerUser, authUser };
