const express = require("express");
const {
  addUnit,
} = require("../controllers/unitControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//router.route("/add").post(protect, addUnit);

module.exports = router;
