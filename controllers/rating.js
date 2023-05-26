const Rating = require("../models/rating");

exports.getRating = (req, res, next) => {
  let { username } = req.query;
  Rating.find({ username: username })
    .then((response) => {
      if (response[0]) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          error: "Data not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: `Something went wrong`,
      });
    });
};

exports.createRating = (req, res, next) => {
  let data = new Rating({
    username: req.body.username,
    reviewer: req.body.reviewer,
    overall: req.body.overall,
    pros: req.body.pros,
    cons: req.body.cons,
    userType: req.body.userType,
    status: req.body.userType,
    reviewSubject: req.body.reviewSubject,
    ratingType: req.body.ratingType,
  });
  Rating.findOne({ reviewer: req.body.reviewer, username: data.username })
    .then((response) => {
      if (!response) {
        data.save().then((result) => {
          res.status(200).json(result)
        })
      } else {
        res.status(208).json({
          error: "Data already exits",
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.deleteRating = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  Rating
    .findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.json({
          error: "Data is Already Deleted",
        });
      }
    })
    .catch((res) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};


exports.updateRating = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  let data = {
    username: req.body.username,
    reviewer: req.body.reviewer,
    overall: req.body.overall,
    pros: req.body.pros,
    cons: req.body.cons,
    userType: req.body.userType,
    status: req.body.userType,
    reviewSubject: req.body.reviewSubject,
    ratingType: req.body.ratingType,
  }
  Rating.findByIdAndUpdate(Id, data, { new: true })
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

exports.getRatingById = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  Rating.findById(Id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          error: "Data not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: `Something went wrong`,
      });
    });
};