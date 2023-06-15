const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetsSchema = new Schema(
  {
    username: { type: String },
    employeeId: {
      type: String,
      default: () => generateEmployeeId(),
    },
    employeeName: { type: String },
    typeOfAssets: { type: String },
    addedBy: { type: String },
    givenDate: { type: String },
    returnDate: { type: String },
    assetsDetails: { type: String },
  },
  {
    timestamps: true,
    collection: "leaveManagementAssets",
  }
);

function generateEmployeeId() {
  const currentYear = new Date().getMilliseconds().toString().substr(-2);
  const paddedSequentialNumber = generateSequentialNumber()
    .toString()
    .padStart(4, "0");
  return `EP-${currentYear}-${paddedSequentialNumber}`;
}

let sequentialNumber = 0;

function generateSequentialNumber() {
  return ++sequentialNumber;
}

module.exports = mongoose.model("leaveManagementAssets", AssetsSchema);
