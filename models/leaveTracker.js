const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const leaveTrakerSchema= new Schema({
    username: {type: String},
    leaveType: {type: String},
    appliedTo: {type: String},
    fromDate: {type: String},
    toDate: {type: String},
    contactNo: {type: Number},
    altConatctNo: {type: Number},
    reason: {type: String},
    image: {type: String},
},
{
    timestamps: true,
    collection: "leaveTracker",
  }
  )

module.exports= mongoose.model("leaveTracker",leaveTrakerSchema)