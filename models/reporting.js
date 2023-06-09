const mongoose= require("mongoose")

const Schema= mongoose.Schema;

const ReportingSchema= new Schema({
    username: {type: String},
    reporting: {type: String}
},
{
    timestamps: true,
    collection: "Reporting",
  }
)

module.exports= mongoose.model("Reporting",ReportingSchema)


