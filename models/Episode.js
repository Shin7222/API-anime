const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
  {
    anime_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anime",
      required: [true, "anime_id wajib diisi"],
    },
    episode_number: {
      type: Number,
      required: [true, "Nomor episode wajib diisi"],
    },
    title: {
      type: String,
      default: "",
    },
    embed_url: {
      type: String,
      required: [true, "embed_url wajib diisi"],
    },
    quality: {
      type: String,
      enum: ["360p", "480p", "720p", "1080p"],
      default: "480p",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Episode", episodeSchema);
