const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const DocumentSchema= new Schema({
    username: {type: String},
    image: {type: String},
    fileName: {type: String},
    employee: [
      {
        type: String,
      },
    ],
    folderName: {type: String},
    fileDescription: {type: String},
    toview:{
      reportingManager: {type: Boolean},
      employee: {type: Boolean}
    },
    toDownload: {
      reportingManager: {type: Boolean},
      employee: {type: Boolean}
    },
},
{
    timestamps: true,
    collection: "Document",
}
)
module.exports= mongoose.model("Document",DocumentSchema)