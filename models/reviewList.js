const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewListSchema = Schema({
  username: { type: String },
  reviewSubject: { type: String,},
  publishingSiteUrl: { type: String,},
  ratingCountReview: { type: Number, default: 0},
  status: { type: String,},
},
);

module.exports = mongoose.model("reviewList", reviewListSchema);
