const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const sliderSchema= new Schema({
    username: {type: String},
    sliderName: {type: String},
    sliderDiscription: {type: String},
    sliderOrder: {type: Number},
    image: {type: String}
});

module.exports= mongoose.model("Slider",sliderSchema)