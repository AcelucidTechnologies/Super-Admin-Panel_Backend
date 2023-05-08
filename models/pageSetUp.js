const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSetUpSchema = new Schema({
  username: { type: String },
  pageTitle: { type: String },
  pageLink: { type: String },
  pageContent: { type: String },
})

module.exports = mongoose.model("PageSetUP", PageSetUpSchema);
