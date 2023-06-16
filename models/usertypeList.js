const mongoose = require("mongoose");

const Schema= mongoose.Schema;

const userTypeListSchema= new Schema({
    username: {type: String},
    userType: {type: String},
    status : {type : String}
},
{
    timestamps: true,
    collection: "userTypeList",
}
)

module.exports= mongoose.model("userTypeList",userTypeListSchema);

