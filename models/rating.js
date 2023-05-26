const mongoose = require("mongoose");
const RatingCriteria = require("../models/ratingCriteria");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  username: {type: String},
  reviewer: { type: String },
  overall: { type: String },
  pros: { type: String },
  cons: { type: String },
  userType: { type: String },
  status: { type: String },
  reviewSubject: { type: String },
  ratingType: [
    {
      criteriaId: { type: String },
      value: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("rating", RatingSchema);
