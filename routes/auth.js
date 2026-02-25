const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { validate, validateLogin } = require("../middleware/validate");

router.post("/register", validate, register);
router.post("/login", validateLogin, login);
router.get("/me", protect, getMe);

module.exports = router;
