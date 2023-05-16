const mongoose= require("mongoose");
const googleAnalyticskeySchema= mongoose.Schema({
    username: {type: String},
    googleAnalyticskey : {type: String}
})

module.exports= mongoose.model("GoogleAnalyticskey",googleAnalyticskeySchema);


