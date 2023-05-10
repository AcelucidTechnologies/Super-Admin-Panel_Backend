const LiveChat= require("../models/liveChat");

exports.createLiveChat=(req,res,next)=>{
let data= new LiveChat({
    propertyId: req.propertyId
})
data.save().then((response)=>{
    if(response){
        res.status(200).json(response)
    }else{
        res.status(404).json({
            error: ""
        })
    }
});
}
