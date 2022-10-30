const express = require("express");
const {
  getChart,
  addChart,
  editChart,
  deleteChart
} = require('../controllers/chartController');
const {
  protect,
  onlyAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();
router.route("/").get(protect, getChart);
router.route("/add").post(onlyAdmin, addChart);
router.route("/edit").post(onlyAdmin, editChart);
router.route("/delete").post(onlyAdmin, deleteChart);

module.exports = router;
