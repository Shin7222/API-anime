const express = require("express");
const router = express.Router();
const {
  getEpisodesByAnime,
  getEpisodeById,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  deleteEpisodesByAnime,
} = require("../controllers/episodeController");
const { protect, adminOnly } = require("../middleware/auth");

// GET semua episode milik 1 anime
router.get("/anime/:anime_id", getEpisodesByAnime);

// GET, PUT, DELETE 1 episode by id
router.get("/:id", getEpisodeById);
router.put("/:id", protect, adminOnly, updateEpisode);
router.delete("/:id", protect, adminOnly, deleteEpisode);

// POST tambah episode baru
router.post("/", protect, adminOnly, createEpisode);

// DELETE semua episode milik 1 anime
router.delete("/anime/:anime_id", protect, adminOnly, deleteEpisodesByAnime);

module.exports = router;
