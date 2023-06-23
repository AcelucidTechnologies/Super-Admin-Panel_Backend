const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const productOptionSchema = Schema({
    productName : {type: String
    }
}) 

module.exports= mongoose.model("productOption",productOptionSchema)