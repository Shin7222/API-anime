const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/anime", require("./routes/anime"));
app.use("/api/auth", require("./routes/auth"));

// 404 handler
app.use(function (req, res) {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

// Global error handler
app.use(function (err, req, res, next) {
  console.error("❌ ERROR:", err.stack);
  res.status(500).json({ success: false, message: err.message });
});

// Koneksi database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB terhubung!");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("❌ Gagal koneksi MongoDB:", err.message));
