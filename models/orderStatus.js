const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderStatusSchema = new Schema(
  {
    username: {type: String},
    orderList: { type: String },
    orderStatus: { type: String },
  },
  {
    timestamps: true,
    collection: "OrderStatus",
  }
);

module.exports = mongoose.model("OrderStatus", orderStatusSchema);
