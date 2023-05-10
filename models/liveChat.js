const mongoose= require("mongoose")
const Schema= mongoose.Schema

const liveChatSchema= new Schema({
    propertId: {type: String}
})

module.exports= mongoose.model("liveChat",liveChatSchema)