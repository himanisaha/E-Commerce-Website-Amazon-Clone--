const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },
    title: String,
    link: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
