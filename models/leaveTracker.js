const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const leaveTrakerSchema= new Schema({
    username: {type: String},
    leaveType: {type: String},
    appliedTo: {type: String},
    fromDate: {type: Date},
    toDate: {type: Date},
    contactNo: {type: Number},
    altConatctNo: {type: Number},
    reason: {type: String},
    image: {type: String},
    status: {type: String, default: "pending"} ,// Initialize leaveTracker status as 'Pending'
},
{
    timestamps: true,
    collection: "leaveTracker",
}
)

module.exports= mongoose.model("leaveTracker",leaveTrakerSchema)