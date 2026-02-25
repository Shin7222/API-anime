const express = require("express");
const router = express.Router();
const {
  getAllAnime,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/animeController");
const { protect } = require("../middleware/auth");

router.get("/", getAllAnime);             // bebas akses
router.get("/:id", getAnimeById);        // bebas akses
router.post("/", protect, createAnime);  // harus login
router.put("/:id", protect, updateAnime); // harus login
router.delete("/:id", protect, deleteAnime); // harus login

module.exports = router;
