const express = require("express");
const router = express.Router();
const {
  getAllAnime,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/animeController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", getAllAnime);
router.get("/:id", getAnimeById);
router.post("/", protect, adminOnly, createAnime);
router.put("/:id", protect, adminOnly, updateAnime);
router.delete("/:id", protect, adminOnly, deleteAnime);

module.exports = router;
