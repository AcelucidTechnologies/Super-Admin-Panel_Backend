const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newReviewerNameSchema = new Schema({
  username: { type: String},
  email: { type: String },
  name: { type: String},
});

module.exports = mongoose.model("NewReviewerName", newReviewerNameSchema);
