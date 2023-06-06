const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewListSchema = Schema({
  username: { type: String },
  reviewSubject: { type: String, required: true},
  publishingSiteUrl: { type: String, required: true },
  ratingCountReview: { type: Number, default: 0},
  status: { type: String,required: true },
},
);

module.exports = mongoose.model("reviewList", reviewListSchema);
