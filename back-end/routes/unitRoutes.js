const express = require("express");
const {
  updateUnit,
  updateLogo
} = require("../controllers/unitControllers");
const { protect, onlyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

//router.route("/").post(protect, addUnit);
router.route("/").put(onlyAdmin, updateUnit);
router.route("/logo").put(onlyAdmin, updateLogo);

module.exports = router;
