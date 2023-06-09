const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const ReimbursementSchema= new Schema({
      username: {type: String},
      employeeId: {type: String},
      employeeName: {type: String},
      journeyDate: {type: Date},
      returnDate: {type: Date},
      travelFrom: {type: String},
      travelTo: {type: String},
      purposeTravel: {type: String},
      modifiedBy: {type: String},
      status: {type: String , default: "Pending"},
      totalReimbursementAmount:{type: Number },
      image: {type: String},
      addedBy:  [
        {
          type: String,
        },
      ],
},
{
    timestamps: true,
    collection: "Reimbursement",
  }
)

module.exports= mongoose.model("Reimbursement",ReimbursementSchema)
