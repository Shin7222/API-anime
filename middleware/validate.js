const validate = function (req, res, next) {
  const { username, email, password } = req.body;

  // Cek field kosong
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, email, dan password wajib diisi",
    });
  }

  // Cek format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Format email tidak valid",
    });
  }

  // Cek panjang password
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password minimal 6 karakter",
    });
  }

  // Cek panjang username
  if (username.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Username minimal 3 karakter",
    });
  }

  // Cek username tidak mengandung spasi
  if (/\s/.test(username)) {
    return res.status(400).json({
      success: false,
      message: "Username tidak boleh mengandung spasi",
    });
  }

  next();
};

const validateLogin = function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password wajib diisi",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Format email tidak valid",
    });
  }

  next();
};

module.exports = { validate, validateLogin };
