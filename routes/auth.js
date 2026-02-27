const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateRole,
} = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/auth");
const { validate, validateLogin } = require("../middleware/validate");

router.post("/register", validate, register);
router.post("/login", validateLogin, login);
router.get("/me", protect, getMe);
router.put("/role/:id", protect, adminOnly, updateRole);

module.exports = router;
