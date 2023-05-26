const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewerListSchema = Schema({
  username: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, max: 5, min: 1 },
  firstRating: { type: Date },
  status: { type: String, default: "InActive" },
});

module.exports = mongoose.model("reviewerList", reviewerListSchema);
