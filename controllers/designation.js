const Designation= require("../models/designation");

exports.createDesignation= (req,res,next)=>{
    let data = new Designation({
        username: req.body.username,
        designation: req.body.designation
    })

    Designation.findOne({designation: data.designation,username: data.username}).then((response)=>{
        if(!response){
            data.save().then((result)=>{
                res.status(200).json(result)
            })
        }else{
            res.status(208).json({
                error: "Designation name is already exits"
            })
        }
    }).catch((res)=>{
        res.status(500).json({
            error: "Something went wrong"
        })
    })
}


exports.getDesignation=(req,res,next)=>{
    let { username } = req.query;
    Designation.find({ username: username })
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
