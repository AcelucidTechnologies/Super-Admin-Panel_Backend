const mongoose = require("mongoose")
const Schema = mongoose.Schema

const couponSchema = new Schema(
  {
    country: { type: String },
    title: { type: String },
    code: { type: String },
    coupontype: {
      type: String,
      default: "fixed",
      enum: ["fixed", "percentage"],
    },
    customerId: { type: Schema.Types.ObjectId },
    startDate: { type: Date },
    endDate: { type: Date },
    quotaPerUser: { type: Number },
    isForFirstTimeUser: { type: Boolean },
    status: {
      type: String,
      default: "applied",
      enum: ["applied", "pending", "cleared"]
    },
    maxDiscount: { type: Number },
    minBillAmount: { type: Number },
    discount: { type: Number },
    addedDate: { type: Date },
    description: { type: String }
  },
  {
    timestamps: false,
    collection: "coupon",
  }
);

  module.exports = mongoose.model("Coupon", couponSchema)