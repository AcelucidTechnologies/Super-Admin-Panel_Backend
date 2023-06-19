const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    orderId: {
        type: String,
        default: () => generateOrderId(),
      },
    username: { type: String },
    name: { type: String },
    contactNumber: { type: String },
    address: { type: String },
    department: { type: String },
    paymentMode: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
    collection: "Customer",
  }
);

function generateOrderId() {
    const currentYear = new Date().getMilliseconds().toString().substr(-2);
    const paddedSequentialNumber = generateSequentialNumber()
      .toString()
      .padStart(4, "0");
    return `OrderID-${currentYear}-${paddedSequentialNumber}`;
  }
  
  let sequentialNumber = 0;
  
  function generateSequentialNumber() {
    return ++sequentialNumber;
  }
  
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [day, month, year].join('-');
  }

module.exports = mongoose.model("Customer", CustomerSchema);
