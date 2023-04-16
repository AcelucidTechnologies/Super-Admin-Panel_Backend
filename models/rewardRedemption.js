const mongoose = require("mongoose")
const Schema = mongoose.Schema

const rewardSchema = new Schema({
    couponCodeId:{type:Schema.Types.ObjectId},
    couponCodeName:{type:String},
    customerEmail:{type:String},
    appliedOn:{type:Date},
    completedOn:{type:Date},
    status:{type:String,
        default: "completed",
        enum: ["completed", "pending", "cancelled"]}
},
{
    timestamps:false ,
    collection: "reward"
}
)

module.exports = mongoose.model("Reward", rewardSchema);