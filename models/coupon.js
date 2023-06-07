const mongoose = require("mongoose")
const Schema = mongoose.Schema

const couponSchema = new Schema(
  {
    username: {type:String},
    couponName: {type: String},
    userPerCoupon: {type : Number},
    couponCode: { type: String },
    coupontype: {
      type: String,
      default: "Flat",
      enum: ["Flat", "Percentage(%)"],
    },
    //customerId: { type: Schema.Types.ObjectId },
    startDate: { type: Date},
    endDate: { type: Date },
    category: {type : String},
    product: {type : String},
    usesPerCoupon: { type: Number},
    status: {
      type: String,
      default: "applied",
      enum: ["applied", "pending", "cleared"]
    },
    maxDiscount: { type: Number, },
    minDiscount: { type: Number },
    discount: { type: Number },
    description: { type: String }
  },

 
  {
    timestamps: true,
    collection: "coupon",
  }
);


  module.exports = mongoose.model("Coupon", couponSchema)
  