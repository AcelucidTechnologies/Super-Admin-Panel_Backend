const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  reviewer: { type: String },
  overall: { type: String },
  Pros: { type: String },
  cons: { type: String },
  userType: { type: String },
  status: { type: String },

  reviewSubject: {type: String},
  type: {
    Staff: { type: int },
    Location: { type: int },
    Facilities: { type: int },
    Comfort: { type: int },
    Cleaniness: { type: int },
  },
});

module.exports= mongoose.model("rating",RatingSchema)
