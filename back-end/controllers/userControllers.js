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

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Add new user
//@route           POST /api/user/add
//@access          Protected
const addUser = asyncHandler(async (req, res) => {
  const { Rank, Name, DoDID, Type } = req.body;

  if (!Rank || !Name || !DoDID || !Type) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ DoDID });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  Invcode = Math.random().toString(36).substring(2,10);

  const user = await User.create({
    Name,
    DoDID,
    Rank,
    Type,
    Invcode
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      Name: user.Name,
      Rank: user.Rank,
      DoDID: user.DoDID,
      Type: user.Type,
      Invcode: user.Invcode
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Register new user
//@route           POST /api/user/register
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { Rank, Name, DoDID, email, password, pic, Invcode } = req.body;

  if (!Rank || !Name || !email || !password || !DoDID) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userDb = await User.findOne({ DoDID });

  if (!userDb) {
    res.status(400);
    throw new Error("Unauthorized User, Contact Unit Manager");
  }

  if (userDb.is_registered) {
    res.status(400);
    throw new Error("Already Registered User");
  }

  if (Invcode != userDb.Invcode) {
    res.status(400);
    throw new Error("Invalid Invite Code");
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
    throw new Error("User Not Found");
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
    throw new Error("Not Registered, But Added");
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      Name: user.Name,
      DoDID: user.DoDID,
      email: user.email,
      Type: user.Type,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid DoDID or Password");
  }
});

module.exports = { allUsers, addUser, registerUser, authUser };
