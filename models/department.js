const mongoose= require("mongoose")

const Schema= mongoose.Schema;

const DeparmentSchema= new Schema({
    username: {type: String},
    department: {type: String}
},
{
    timestamps: true,
    collection: "department",
  }
)

module.exports= mongoose.model("department",DeparmentSchema)


