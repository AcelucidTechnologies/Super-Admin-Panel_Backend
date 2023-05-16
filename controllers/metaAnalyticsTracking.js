const metaAnalytics= require("../models/metaAnalyticsTracking")

exports.createMetaAnalysisKey=(req,res,next)=>{
    let Data= new metaAnalytics({
        username: req.body.username,
        metaAnalyticsKey: req.body.metaAnalyticsKey
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