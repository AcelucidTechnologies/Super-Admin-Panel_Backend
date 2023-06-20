const Reporting= require("../models/reporting");

exports.createReporting= (req,res,next)=>{
    let data = new Reporting({
        username: req.body.username,
        reporting: req.body.reporting
    })

    Reporting.findOne({reporting: data.reporting,username: data.username}).then((response)=>{
        if(!response){
            data.save().then((result)=>{
                res.status(200).json(result)
            })
        }else{
            res.status(208).json({
                error: "Reporting name is already exits"
            })
        }
    }).catch((res)=>{
        res.status(500).json({
            error: "Something went wrong"
        })
    })
}


exports.getReporting=(req,res,next)=>{
    let { username } = req.query;
    Reporting.find({ username: username })
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
      });
}
