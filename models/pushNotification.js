const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const pushNotificationSchema= Schema({
    username: {type: String},
    apiId : {type: String},
    authenticationkey: {type: String}
})
module.exports=mongoose.model("pushNotification",pushNotificationSchema);