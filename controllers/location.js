const Location= require("../models/location");

exports.createLocation= (req,res,next)=>{
    let data = new Location({
        username: req.body.username,
        location: req.body.location
    })

    Location.findOne({location: data.location,username: data.username}).then((response)=>{
        if(!response){
            data.save().then((result)=>{
                res.status(200).json(result)
            })
        }else{
            res.status(208).json({
                error: "Location name is already exits"
            })
        }
    }).catch((res)=>{
        res.status(500).json({
            error: "Something went wrong"
        })
    })
}

exports.getLocation=(req,res,next)=>{
    let { username } = req.query;
    Location.find({ username: username })
      .then((response) => {
        if (response) {
            console.log(response)
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
