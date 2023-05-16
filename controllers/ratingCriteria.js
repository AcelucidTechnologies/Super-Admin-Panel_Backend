const RatingCriteria = require("../models/ratingCriteria");

exports.getRatingCriteria=(req,res,next)=>{
  RatingCriteria.find({username: username}).then((response)=>{
      if(response[0]){
          res.status(200).json(response)
      }else{
          res.status(404).json({
              error: "Data not found"
          })
      }
  }).catch((err)=>{
      res.status(500).json({
          error: `Something went wrong`
      })
  })
}

exports.createRatingCriteria = (req, res, next) => {
  let data = new RatingCriteria({
    username: req.body.username,
    ratingCriteria: req.body.ratingCriteria,
    status: req.body.status,
  });
  RatingCriteria.findOne({ ratingCriteria: req.body.ratingCriteria }).then(
    (response) => {
      if (!response) {
        data.save().then((result) => {
          res.status(200).json(result);
        });
      }
      else{
        res.status(208).json({
          error: "Data already exits"
        })
      }
    }
  ).catch((err)=>{
    res.status(500).json({
      error: "Something went wrong"
    })
  })
};
