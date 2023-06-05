const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewListSchema = Schema({
  username: { type: String },
  reviewSubject: { type: String, required: true},
  publishingSiteUrl: { type: String, required: true },
  rating: { type: Number, max: 5, min: 1 },
  status: { type: String,required: true },
  reviewListId: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model("reviewList", reviewListSchema);

