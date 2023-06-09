const mongoose= require("mongoose")

const Schema= mongoose.Schema;

const DesignationSchema= new Schema({
    username: {type: String},
    designation: {type: String}
},
{
    timestamps: true,
    collection: "designation",
  }
)

module.exports= mongoose.model("designation",DesignationSchema)


