const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ShipmentSchema = new Schema(
  {
    shipmentId: { type: Number, index: true, unique: true },
    orderId: { type: Number, unique: true },
    customerId: { type: Schema.Types.ObjectId },
    shippingTo: { type: String },
    shipmentDate: { type: Date },
    productDetails: { type: String },
    quantity: { type: Number },
    address: { type: Schema.Types.ObjectId },
    transactionId: { type: Number,unique:true },
  },
  {
    timestamps: false,
    collection: "shipment",
  }
);

module.exports = mongoose.model("Shipment", ShipmentSchema);