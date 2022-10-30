const express = require("express");
const {
  updateUnit,
  updateLogo,
  addUnit,
  getUnit
} = require("../controllers/unitControllers");
const {
  protect,
  onlyAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(onlyAdmin, addUnit);
router.route("/").put(onlyAdmin, updateUnit);
router.route("/logo").put(onlyAdmin, updateLogo);
router.route("/get").get(protect, getUnit);


module.exports = router;
