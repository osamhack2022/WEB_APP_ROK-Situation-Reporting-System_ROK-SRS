const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  addUser,
  updateUser
} = require("../controllers/userControllers");
const { protect, onlyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);//protect,
router.route("/add").post(onlyAdmin, addUser);
router.route("/register").post(registerUser);
router.post("/login", authUser);
router.post("/update", protect, updateUser);

module.exports = router;
