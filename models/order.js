const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    username: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    city: {type: String},
    pincode: {type: Number},
    state: {type: String},
    landmark: {type: String},
    address: {type: String}
  },
  {
    timestamps: true,
    collection: "Order",
  }
);

module.exports = mongoose.model("Order", orderSchema);
