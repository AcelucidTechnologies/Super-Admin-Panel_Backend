const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const DocumentSchema= new Schema({
    username: {type: String},
    image: {type: String},
    fileName: {type: String},
    fileViewed: {type: String},
    employee: {type: String},
    folderName: {type: String},
    fileDescription: {type: String},
    toview: {type: String},
    toDownload: {type: String},
},
{
    timestamps: true,
    collection: "Document",
  }
)
module.exports= mongoose.model("Document",DocumentSchema)