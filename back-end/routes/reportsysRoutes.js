const express = require("express");
const {
  addReportsys,
	removeReportsys
} = require("../controllers/reportsysControllers");
const {
  protect,
  onlyAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(onlyAdmin, addReportsys);
router.route("/").delete(onlyAdmin, addReportsys);

module.exports = router;
