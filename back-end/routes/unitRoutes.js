const express = require("express");
const {
  updateUnit,
} = require("../controllers/unitControllers");
const { protect, onlyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

//router.route("/add").post(protect, addUnit);
router.route("/update").post(onlyAdmin, updateUnit);

module.exports = router;
