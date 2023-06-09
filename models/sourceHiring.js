const mongoose= require("mongoose")

const Schema= mongoose.Schema;

const SourceHiringSchema= new Schema({
    username: {type: String},
    sourceHiring: {type: String}
},
{
    timestamps: true,
    collection: "SourceHiring",
  }
)

module.exports= mongoose.model("SourceHiring",SourceHiringSchema)


