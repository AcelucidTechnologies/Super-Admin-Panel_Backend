const mongoose= require("mongoose")

const Schema= mongoose.Schema;

const LocationSchema= new Schema({
    username: {type: String},
    location: {type: String}
},
{
    timestamps: true,
    collection: "Location",
  }
)

module.exports= mongoose.model("Location",LocationSchema)


