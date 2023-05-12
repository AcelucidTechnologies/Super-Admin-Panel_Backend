const mongoose= require("mongoose")
const Schema= mongoose.Schema

const SeoSchema =  new Schema({
    username: {type: String},
    selectPage : {type: String},
    metaTitle: {type: String},
    metaDescription: {type: String},
    metaKeyword: {type: String}
})

module.exports= mongoose.model("Seo",SeoSchema)