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

//@description     Add new user
//@route           POST /api/user/add
//@access          Public
const addUser = asyncHandler(async (req, res) => {
  const { rank, name, dodId, isAdmin } = req.body;

  if (!rank || !name || !dodId || !isAdmin) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ dodId });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  invCode = Math.random().toString(36).substring(2,4);

  const user = await User.create({
    name,
    dodId,
    rank, 
    isAdmin,
    invCode
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      rank: user.rank,
      dodId: user.dodId,
      isAdmin: user.isAdmin,
      invCode: user.invCode
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
  const { rank, name, dodId, email, password, pic, invCode } = req.body;

  if (!name || !email || !password || !dodId) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userDb = await User.findOne({ dodId });

  if (!userDb) {
    res.status(400);
    throw new Error("Unauthorized User, Contact Unit Manager");
  }

  if (invCode != userDb.invCode) {
    res.status(400);
    throw new Error("Invalid Invite Code");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userDb._id,
    {
      email: email,
    },    
    {
      password: password,
    },
    {
      pic: pic,
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
      name: updatedUser.name,
      rank: updatedUser.rank,
      dodId: updatedUser.dodId,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
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
