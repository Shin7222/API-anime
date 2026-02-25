const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async function (req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Akses ditolak, login terlebih dahulu",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error("❌ Error protect middleware:", err.message);
    res.status(401).json({ success: false, message: "Token tidak valid" });
  }
};

module.exports = { protect };
