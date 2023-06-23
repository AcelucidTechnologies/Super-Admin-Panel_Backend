const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriptionPlanSchema = new Schema(
  {
    username: { type: String },
    planName: { type: String },
    planCode: { type: String },
    price: { type: Number },
    billEvery: { type: String },
    billingCycle: { type: String },
    planInDays: { type: Number },
    comment: { type: String },
  },
  {
    timestamps: true,
    collection: "SubscriptionPlan",
  }
);

module.exports = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);
