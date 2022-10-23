const express = require("express");
const {
  addReportsys,
  editReportsys,
	removeReportsys,
  getReportsys
} = require("../controllers/reportsysControllers");
const {
  protect,
  onlyAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(onlyAdmin, addReportsys);
router.route("/").put(onlyAdmin, editReportsys);
router.route("/").delete(onlyAdmin, removeReportsys);
router.route("/").get(protect, getReportsys);

module.exports = router;
