const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const addCouponSchema = new Schema(
  {
    username: { type: String },
    couponName: { type: String },
    couponCode: { type: String },
    discountPrice: { type: Number },
    redemptionType: { type: String },
    associatedPlans: { type: String },
    associatedAddons: { type: String },
    validUpto: { type: String },
    maximumRedemptions: { type: String },
  },
  {
    timestamps: true,
    collection: "addCoupon",
  }
);

module.exports = mongoose.model("addCoupon", addCouponSchema);
