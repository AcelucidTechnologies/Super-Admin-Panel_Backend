const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const CreateOrderSchema= new Schema({
    username: {type: String},
    mobileNo: {type: Number}
})

module.exports= mongoose.model("createOrder",CreateOrderSchema);