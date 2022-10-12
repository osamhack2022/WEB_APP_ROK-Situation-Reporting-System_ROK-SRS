const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  addUser
} = require("../controllers/userControllers");
const { protect, onlyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(allUsers);//protect,
router.route("/add").post(onlyAdmin, addUser);
router.route("/register").post(registerUser);
router.post("/login", authUser);

module.exports = router;
