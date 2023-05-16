const mongoose= require("mongoose");
const googleAnalyticskeySchema= mongoose.Schema({
    googleAnalyticskey : {type: String}
})

module.exports= mongoose.model("GoogleAnalyticskey",googleAnalyticskeySchema);


