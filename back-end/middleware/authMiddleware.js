const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("잘못된 토큰입니다.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("토큰이 없습니다. 인증되지 않았습니다.");
  }
});

const onlyAdmin = asyncHandler(async (req, res, next) => { // Todo: access handler
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("잘못된 토큰입니다.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("토큰이 없습니다. 인증되지 않았습니다.");
  }

  if (req.user.Type != "commander" && req.user.Type != "commender" && req.user.Type != "Commander") {
    res.status(401);
    throw new Error("권한이 없습니다.");
  }
});

module.exports = {
  protect,
  onlyAdmin
};
