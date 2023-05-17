const GoogleAnalyticskey= require("../models/googleAnalyticsTracking");

exports.createGoogleAnalysisKey=(req,res,next)=>{
let Data= new GoogleAnalyticskey({
    username: req.body.username,
    googleAnalyticskey: req.body.googleAnalyticskey
})
Data.save().then((response)=>{
if(response){
    res.status(200).json(response)
}else{
    res.status(404).json({
        error: "Data not inserted Successfully"
    })
}
}).catch((err)=>{
    res.status(500).json({
        error: "Something went wrong"
    })
})
}

