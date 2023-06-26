const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const ReimbursementSchema= new Schema({
      username: {type: String},
      employeeId: {type: String},
      employeeName: {type: String},
      journeyDate: {type: String},
      returnDate: {type: String},
      travelFrom: {type: String},
      travelTo: {type: String},
      purposeTravel: {type: String},
      modifiedBy: {type: String},
      addedBy: {type: String}
},
{
    timestamps: true,
    collection: "Reimbursement",
  }
)

module.exports= mongoose.model("Reimbursement",ReimbursementSchema)
