const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSpecialSchema = new Schema({
  username: { type: String },
  bannerName: { type: String },
  bannerDescription: { type: String },
  bannerOrder: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model("bannerSpecial", bannerSpecialSchema);

