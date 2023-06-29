const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
notificationContent: {type: String,default: "You have a new leave notification"},
username: {type: String},
fromDate: {type: Date},
toDate: {type: Date},
isNotificationStatus: {type: Boolean},
},
{
    timestamps: true,
    collection: "notification",
  }
)

module.exports= mongoose.model("notification",notificationSchema)

