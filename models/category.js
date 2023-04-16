const mongoose = require("mongoose");
const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    name: { type: String, lowercase: true },
    parentcategoryId: {
      type: Schema.Types.ObjectId,
    },
    status: { type: Boolean },
    image: { type: String },
    description: { type: String },
    meta_description: {
      meta_title: { type: String },
      meta_descrip: { type: String },
      meta_keyword: { type: String },
    },
  },
  {
    timestamps: false,
    collection: "category",
  }
);

  module.exports = mongoose.model("Category", categorySchema)