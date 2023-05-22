const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageSetUpDataSchema = new Schema({
  username: { type: String },
  pageTitle: { type: String },
  pageLink: { type: String },
})

module.exports = mongoose.model("PageSetUPData", PageSetUpDataSchema);
