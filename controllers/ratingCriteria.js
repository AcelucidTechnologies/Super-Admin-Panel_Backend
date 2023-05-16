const RatingCriteria = require("../models/ratingCriteria");

exports.getRatingCriteria=(req,res,next)=>{
  let { username } = req.query;
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
  RatingCriteria.findOne({ ratingCriteria: req.body.ratingCriteria,
    username: data.username }).then(
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

exports.updateRatingCriteria = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  let Data = req.body;
  RatingCriteria
    .findByIdAndUpdate(Id, Data, { new: true })
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong while updating Rating Criteria" }],
      });
    });
};
