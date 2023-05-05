const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const featureProductSchema = new Schema({
    username: {type: String},
    productName: {type : String},
    productPrice: {type: Number},
    productModel: {type: String},
    image: {type: String},
    productQuantity: {type: Number}
})

module.exports= mongoose.model("featureProduct",featureProductSchema)
