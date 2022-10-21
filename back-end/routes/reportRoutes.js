const express = require("express");
const {
  addReportCard,
  getReportCard
} = require("../controllers/reportControllers");
const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, addReportCard);
router.route("/").get(protect, getReportCard);

module.exports = router;
