const LiveChat= require("../models/liveChat");

exports.createLiveChat=(req,res,next)=>{
let data= new LiveChat({
    propertyId: req.propertyId
})
data.save();
}
