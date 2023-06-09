const SourceHiring= require("../models/sourceHiring");

exports.createSourceHiring= (req,res,next)=>{
    let data = new SourceHiring({
        username: req.body.username,
        sourceHiring: req.body.sourceHiring
    })

    SourceHiring.findOne({sourceHiring: data.sourceHiring,username: data.username}).then((response)=>{
        if(!response){
            data.save().then((result)=>{
                res.status(200).json(result)
            })
        }else{
            res.status(208).json({
                error: "Source Hiring name is already exits"
            })
        }
    }).catch((res)=>{
        res.status(500).json({
            error: "Something went wrong"
        })
    })
}


exports.getSourceHiring=(req,res,next)=>{
    let { username } = req.query;
    SourceHiring.find({ username: username })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong" },
          ],
        });
        console.log(err);
      });
}
