const mongoose= require("mongoose");
const Schema = new mongoose.Schema;

const sliderSchema= Schema({
    sliderName: {type: String},
    sliderDiscription: {type: String},
    sliderOrder: {type: Number},
    image: {type: String}
})

module.exports= mongoose.model("Slider",sliderSchema)