const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Unit = require("../models/unitModel");

//@description     Add new unit
//@route           POST /api/unit
//@access          Protected
const addUnit = asyncHandler(async (req, res) => {
  const {
    Unitname,
    Unitslogan,
    Logo
  } = req.body;

  if (!Unitname || !Unitslogan || !Logo) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  const unitExists = await User.findOne({
    Unitname
  });

  if (unitExists) {
    res.status(400);
    throw new Error("이미 등록된 부대입니다.");
  }
  Members = [req.user._id, ];
  unitAdmins = [req.user._id, ];
  const unit = await Unit.create({
    Unitname,
    Unitslogan,
    Logo,
    Members,
    unitAdmins
  });

  if (unit) {
    res.status(201).json({
      _id: unit._id,
      Unitname: unit.Unitname,
      Unitslogan: unit.Unitslogan,
      Logo: unit.Logo,
      Members: unit.Members,
      unitAdmins: unit.unitAdmins
    });
  } else {
    res.status(400);
    throw new Error("부대 정보를 찾을 수 없습니다.");
  }
});

//@description     Update unit info
//@route           POST /api/unit/
//@access          Protected(only admin)
const updateUnit = asyncHandler(async (req, res) => {
  const {
    Unitname,
    Unitslogan
  } = req.body;

  if (!Unitname || !Unitslogan) {
    res.status(400);
    throw new Error("모든 정보를 입력하세요.");
  }

  const unitId = req.user.Unit;

  const updatedUnit = await User.findByIdAndUpdate(
    unitId, {
      Unitname: Unitname,
      Unitslogan: Unitslogan
    }, {
      new: true,
    }
  )

  if (updatedUnit) {
    res.status(201).json({
      _id: updatedUnit._id,
      Unitname: updatedUnit.Unitname,
      Unitslogan: updatedUnit.Unitslogan,
      Logo: updatedUnit.Logo,
      Members: updatedUnit.Members,
      unitAdmins: updatedUnit.unitAdmins
    });
  } else {
    res.status(400);
    throw new Error("부대 정보를 찾을 수 없습니다.");
  }
});

//@description     Update unit logo
//@route           put /api/unit/logo
//@access          Protected(only admin)
const updateLogo = asyncHandler(async (req, res) => {
  const {
    Logo
  } = req.body;

  if (!Logo) {
    res.status(400);
    throw new Error("수정할 Logo 정보를 입력하세요.");
  }

  const unitId = req.user.Unit;

  const updatedUnit = await User.findByIdAndUpdate(
    unitId, {
      Logo: Logo
    }, {
      new: true,
    }
  )

  if (updatedUnit) {
    res.status(201).json({
      _id: updatedUnit._id,
      Unitname: updatedUnit.Unitname,
      Unitslogan: updatedUnit.Unitslogan,
      Logo: updatedUnit.Logo,
      Members: updatedUnit.Members,
      unitAdmins: updatedUnit.unitAdmins
    });
  } else {
    res.status(400);
    throw new Error("부대 정보를 찾을 수 없습니다.");
  }
});

module.exports = {
  updateUnit,
  updateLogo,
  addUnit
};
