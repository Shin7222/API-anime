const Anime = require("../models/Anime");

// GET semua anime + search, filter, pagination
exports.getAllAnime = async (req, res) => {
  try {
    const {
      search,
      genre,
      status,
      year,
      page = 1,
      limit = 10,
      sort = "-score",
    } = req.query;

    const query = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (genre) query.genre = { $in: [genre] };
    if (status) query.status = status;
    if (year) query.year = Number(year);

    const total = await Anime.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const anime = await Anime.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages,
      data: anime,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET anime by ID
exports.getAnimeById = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime)
      return res
        .status(404)
        .json({ success: false, message: "Anime tidak ditemukan" });
    res.json({ success: true, data: anime });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST tambah anime baru
exports.createAnime = async (req, res) => {
  try {
    const animeData = { ...req.body };
    if (req.file) {
      animeData.poster = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }
    const anime = await Anime.create(animeData);
    res.status(201).json({ success: true, data: anime });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT update anime
exports.updateAnime = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.poster = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }
    const anime = await Anime.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!anime)
      return res
        .status(404)
        .json({ success: false, message: "Anime tidak ditemukan" });
    res.json({ success: true, data: anime });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE anime
exports.deleteAnime = async (req, res) => {
  try {
    const anime = await Anime.findByIdAndDelete(req.params.id);
    if (!anime)
      return res
        .status(404)
        .json({ success: false, message: "Anime tidak ditemukan" });
    res.json({ success: true, message: "Anime berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
