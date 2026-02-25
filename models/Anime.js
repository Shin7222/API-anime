const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Judul anime wajib diisi"],
    },
    genre: [String],
    episodes: Number,
    status: {
      type: String,
      enum: ["ongoing", "completed", "upcoming"],
      default: "completed",
    },
    score: {
      type: Number,
      min: 0,
      max: 10,
    },
    synopsis: String,
    studio: String,
    year: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Anime", animeSchema);
