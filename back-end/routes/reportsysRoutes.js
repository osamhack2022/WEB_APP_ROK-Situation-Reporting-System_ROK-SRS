const express = require("express");
const {
  addReportsys,
	removeReportsys,
  getReportsys
} = require("../controllers/reportsysControllers");
const {
  protect,
  onlyAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(onlyAdmin, addReportsys);
router.route("/").delete(onlyAdmin, removeReportsys);
router.route("/").get(protect, getReportsys);

module.exports = router;
