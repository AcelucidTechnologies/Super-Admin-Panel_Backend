const mongoose = require("mongoose");
const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    username: {type: String},
    categoryName: { type: String},
    subCategory: {type: String},
    status: { type: Boolean },
    image: { type: String },
   categoryOrder: {type: Number}
    // meta_description: {
    //   meta_title: { type: String },
    //   meta_descrip: { type: String },
    //   meta_keyword: { type: String },
    // },
        // parentcategoryId: {
    //   type: Schema.Types.ObjectId,
    // },
       // description: { type: String },
  },
  {
    timestamps: true,
    collection: "category",
  }
);

  module.exports = mongoose.model("Category", categorySchema)