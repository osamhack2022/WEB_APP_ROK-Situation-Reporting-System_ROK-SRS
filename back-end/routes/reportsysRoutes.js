const express = require("express");
const {
	addReportsys
} = require("../controllers/reportsysControllers");
const { protect, onlyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(onlyAdmin, addReportsys);

module.exports = router;
