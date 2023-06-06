const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  username: {type: String},
  reviewer: { type: String },
  review: {type : String},
  overall: { type: String },
  pros: { type: String },
  cons: { type: String },
  userType: { type: String },
  status: { type: String },
  reviewSubject: { type: String },
  AverageRating: {type: String , default: "0"},
  ratings: [
    {
      name: { type: String },
      rating: { type: Number, default: 0 },
    },
  ],
},

{
  timestamps: true,
  collection: "ratings",
}
);
module.exports = mongoose.model("rating", RatingSchema);

// const mongoose = require('mongoose');
// const ratingSchema = new mongoose.Schema({
  
//   reviewer: {
//     type: String,
//     required: true,
//   },
//   reviewerCount: {
//     type: Number,
//     default: 0,
//   },
//   reviewSubjectCount: {
//     type: Number,
//     default: 0,
//   },
//   reviewersRatingDetails: [
    
//     {
//       reviewer: {
//         type: String,
//         required: true,
//       },
//       reviewSubject: {
//         type: String,
//         required: true,
//       },
//       review: {
//         type: String,
//         required: true,
//       },
//       pros: {
//         type: String,
//       },
//       cons: {
//         type: String,
//       },
//       status: {
//         type: String,
//         required: true,
//       },
//       userType: {
//         type: String,
//         required: true,
//       },
//       overall: {
//         type: String,
//         required: true,
//       },
//       ratings: [
//      {
//        name: { type: String },
//        rating: { type: Number, default: 0 },
//     },
//    ],
//     },
//   ],
// });

// module.exports = mongoose.model("rating", ratingSchema);


