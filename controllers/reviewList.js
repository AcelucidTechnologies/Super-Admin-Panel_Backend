//const reviewList = require("../models/reviewList");
const ReviewList = require("../models/reviewList");

exports.createReviewList = (req, res, next) => {
  let data = new ReviewList({
    username: req.body.username,
    publishingSiteUrl: req.body.publishingSiteUrl,
    reviewSubject: req.body.reviewSubject,
    rating: req.body.rating,
    status: req.body.status,
  });
  ReviewList.findOne({
    publishingSiteUrl: data.publishingSiteUrl,
    username: data.username,
  })
    .then((response) => {
      if (!response) {
        data.save().then((result) => {
          res.json(result);
        });
      } else {
        res.status(404).json({
          errors: [
            {
              error: "Publishing Site Url is already exits",
            },
          ],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          {
            error: "something went wrong",
          },
        ],
      });
    });
};

exports.getAllReviewList = (req, res, next) => {
  let { username } = req.query;
  ReviewList.find({ username: username }).sort({ _id: -1 })
    .then((response) => {
      if (response) {
        console.log("234",response)
        res.status(200).json(response);
      } else {
        res.status(404).json({
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

exports.updateReviewList = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  let data = {
    reviewSubject: req.body.reviewSubject,
    publishingSiteUrl: req.body.publishingSiteUrl,
    rating: req.body.rating,
    status: req.body.status,
  };
  ReviewList.findByIdAndUpdate(Id, data, { new: true })
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

exports.deleteReviewList = (req, res, next) => {
    let Id;
    req.query.id ? (Id = req.query.id) : next();
    ReviewList.findByIdAndDelete(Id)
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

  exports.getRatingReviewById = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    ReviewList.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while fetching a Rating Review detail" }],
        });
        console.log(err);
      });
  };
