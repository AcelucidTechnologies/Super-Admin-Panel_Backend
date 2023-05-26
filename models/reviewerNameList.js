const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewerNameListSchema = new Schema({
  username: { type: String},
  email: { type: String },
  name: { type: String, required: true},
});

module.exports = mongoose.model("reviewerNameList", reviewerNameListSchema);
