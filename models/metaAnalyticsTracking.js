const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const metaAnalyticsSchema= Schema({
    username: {type: String},
    metaAnalyticsKey: {type: String}
})

module.exports=mongoose.model("metaAnalytics",metaAnalyticsSchema)