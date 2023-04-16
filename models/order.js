const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    orderDetails: {
      orderId: { type: Number, index: true, unique: true },
      orderNo: { type: Number, unique: true },
      orderStatus: { type: Boolean },
    },
    customerDetails: {
      customerName: { type: String },
      email: { type: String },
      phoneNo: { type: String },
    },
    productDetails: [
      { productName: { type: String }, quantity: { type: String } },
    ],
    address: {
      billingAddress: {
        name: { type: String },
        phoneNo: { type: Number },
        pincode: { type: Number },
        building: { type: String },
        area: { type: String },
        landmark: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
      },
      shippingAddress: {
        name: { type: String },
        phoneNo: { type: Number },
        pincode: { type: Number },
        building: { type: String },
        area: { type: String },
        landmark: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
      },
    },
  },
  {
    timestamps: false,
    collection: "order",
  }
);

module.exports = mongoose.model("Order", orderSchema);
