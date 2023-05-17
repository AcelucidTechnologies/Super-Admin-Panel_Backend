const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingCriteriaSchema = Schema(
  {
    username: { type: String },
    ratingCriteria: { type: String },
    status: { type: String },
  },
);

module.exports = mongoose.model("ratingCriteria", ratingCriteriaSchema);
