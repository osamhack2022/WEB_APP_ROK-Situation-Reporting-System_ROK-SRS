const express = require("express");
const {
  addComment
} = require("../controllers/commentControllers");
const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, addComment);

module.exports = router;
