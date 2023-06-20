const ReviewerList = require("../models/reviewerList");

exports.createReviewerList = (req, res, next) => {
  let data = new ReviewerList({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    rating: req.body.rating,
    firstRating: req.body.firstRating,
    status: req.body.status,
  });

  ReviewerList.findOne({ name: data.name, username: data.username })
    .then((response) => {
      if (!response) {
        data.save().then((result) => {
          res.status(200).json(result);
        });
      } else {
        res.status(208).json({
          error: "Data already exits",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.getReviewerList = (req, res, next) => {
  let { username } = req.query;
  ReviewerList.find({ username: username }).sort({ firstRating: -1 })
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(204).json({
          error: "Data not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.updateReviewerList = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  let data = {
    name: req.body.name,
    email: req.body.email,
    firstRating: req.body.firstRating,
    rating: req.body.rating,
    status: req.body.status,
  };
  ReviewerList.findByIdAndUpdate(Id, data, { new: true })
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};


exports.deleteReviewerList = (req, res, next) => {
    let Id;
    req.query.id ? (Id = req.query.id) : next();
    ReviewerList.findByIdAndDelete(Id)
      .then((response) => {
        if (response) {
          res.status(200).json(response)
        }
        else{
            res.json({
                error: "Data is Already Deleted"
            })
        }
      })
  
      .catch((err) => {
        res.status(500).json({
          error: "Something went wrong",
        });
      });
  };

  exports.getReviewerListById = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    ReviewerList.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while fetching a Reviewer List detail" }],
        });
      });
  };