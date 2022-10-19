const express = require("express");
const {
  addReportCard
} = require("../controllers/reportControllers");
const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, addReportCard);

module.exports = router;
