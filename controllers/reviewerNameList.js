const ReviewerNameList = require("../models/reviewerNameList");

exports.createReviewerNameList = (req, res, next) => {
  let data = new ReviewerNameList({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });
  ReviewerNameList.findOne({ name: data.name })
    .then((response) => {
      if (!response) {
        data.save().then((result) => {
          res.status(200).json(result);
        });
      } else {
        res.status(404).json({
          errors: [
            {
              error: "Name is already exits",
            },
          ],
        });
      }
    })
    .catch((err) => {
      errors: [
        {
          error: "Something went wrong",
        },
      ];
    });
};

exports.getReviewerNameList = (req, res, next) => {
  let { username } = req.query;
  ReviewerNameList.findOne({ username: username })
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          error: [
            {
              error: "Data not Found",
            },
          ],
        });
      }
    })
    .then((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};
