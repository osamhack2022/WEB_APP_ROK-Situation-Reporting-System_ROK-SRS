const express = require("express");
const {
  addReportCard,
  getReportCard,
  resolveReport
} = require("../controllers/reportControllers");
const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getReportCard);
router.route("/").post(protect, addReportCard);
router.route("/").put(protect, resolveReport);

module.exports = router;
