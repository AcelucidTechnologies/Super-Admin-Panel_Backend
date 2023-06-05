const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewerListSchema = Schema({
  username: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  ratingCount: { type: Number, default: 0},
  firstRating: { type: Date, default: Date.now },
  status: { type: String, default: "Active" },
});

module.exports = mongoose.model("reviewerList", reviewerListSchema);
