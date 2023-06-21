const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const totalLeaveSchema = new Schema(
  {
    username: { type: String },
    casualLeave: { type: Number, default: 14 },
    earned: { type: Number, default: 10 },
    leaveWithoutpay: { type: Number, default: 0 },
    sickLeave: { type: Number, default: 8 },
    workFromHome: { type: Number, default: 5 },
    compOff: { type: Number, default: 5 },
    
  },
  {
    timestamps: true,
    collection: "totalLeave",
  }
);
module.exports = mongoose.model("totalLeave", totalLeaveSchema);
