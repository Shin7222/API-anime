const Episode = require("../models/Episode");
const Anime = require("../models/Anime");

// GET semua episode by anime_id
exports.getEpisodesByAnime = async (req, res) => {
  try {
    // Cek apakah anime ada
    const anime = await Anime.findById(req.params.anime_id);
    if (!anime) {
      return res
        .status(404)
        .json({ success: false, message: "Anime tidak ditemukan" });
    }

    const episodes = await Episode.find({
      anime_id: req.params.anime_id,
    }).sort({ episode_number: 1 });

    res.json({
      success: true,
      anime: anime.title,
      total: episodes.length,
      data: episodes,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET 1 episode by id
exports.getEpisodeById = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id).populate(
      "anime_id",
      "title poster"
    );
    if (!episode)
      return res
        .status(404)
        .json({ success: false, message: "Episode tidak ditemukan" });
    res.json({ success: true, data: episode });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST tambah episode (admin only)
exports.createEpisode = async (req, res) => {
  try {
    const { anime_id, episode_number, title, embed_url, quality } = req.body;

    // Cek apakah anime ada
    const anime = await Anime.findById(anime_id);
    if (!anime) {
      return res
        .status(404)
        .json({ success: false, message: "Anime tidak ditemukan" });
    }

    // Cek apakah episode dengan nomor yang sama sudah ada
    const existing = await Episode.findOne({ anime_id, episode_number });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Episode ${episode_number} sudah ada untuk anime ini`,
      });
    }

    const episode = await Episode.create({
      anime_id,
      episode_number,
      title,
      embed_url,
      quality,
    });

    res.status(201).json({ success: true, data: episode });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT update episode (admin only)
exports.updateEpisode = async (req, res) => {
  try {
    const episode = await Episode.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!episode)
      return res
        .status(404)
        .json({ success: false, message: "Episode tidak ditemukan" });
    res.json({ success: true, data: episode });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE episode (admin only)
exports.deleteEpisode = async (req, res) => {
  try {
    const episode = await Episode.findByIdAndDelete(req.params.id);
    if (!episode)
      return res
        .status(404)
        .json({ success: false, message: "Episode tidak ditemukan" });
    res.json({ success: true, message: "Episode berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE semua episode by anime_id (admin only)
exports.deleteEpisodesByAnime = async (req, res) => {
  try {
    const result = await Episode.deleteMany({ anime_id: req.params.anime_id });
    res.json({
      success: true,
      message: `${result.deletedCount} episode berhasil dihapus`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
