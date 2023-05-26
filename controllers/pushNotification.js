const pushNotification= require("../models/pushNotification")

exports.createPushNotification=(req,res,next)=>{
    let Data= new pushNotification({
        username: req.body.username,
        apiId: req.body.apiId,
        authenticationkey: req.body.authenticationkey,
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