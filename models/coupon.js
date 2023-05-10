const mongoose = require("mongoose")
const Schema = mongoose.Schema

const couponSchema = new Schema(
  {
    username: {type:String},
    couponCode: { type: String },
    coupontype: {
      type: String,
      default: "fixed",
      enum: ["fixed", "percentage"],
    },
    //customerId: { type: Schema.Types.ObjectId },
    startDate: { type: Date },
    endDate: { type: Date },
    category: {type : String},
    product: {type : String},
    usesPerCoupon: { type: Number },
    status: {
      type: String,
      default: "applied",
      enum: ["applied", "pending", "cleared"]
    },
    maxDiscount: { type: Number },
    minDiscount: { type: Number },
    discount: { type: Number },
    description: { type: String }
  },
 
  {
    timestamps: false,
    collection: "coupon",
  }
);

  module.exports = mongoose.model("Coupon", couponSchema)
  