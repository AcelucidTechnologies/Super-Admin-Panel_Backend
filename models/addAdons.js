const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addCouponSchema = new Schema(
  {
    username: { type: String },
    addonName: { type: String },
    addonCode: { type: String },
    Comment: { type: String },
    price: { type: Number },
    addonType: { type: String },
    pricing: { type: Number },
    associatedPlans: { type: String },
  },
  {
    timestamps: true,
    collection: "addAddons",
  }
);


module.exports = mongoose.model("addAddons", addCouponSchema);
