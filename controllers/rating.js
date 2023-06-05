
const Rating = require("../models/rating");
const Reviewer = require("../models/reviewerList");

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

// exports.createRating = (req, res, next) => {
//   let data = new Rating({
//     username: req.body.username,
//     reviewer: req.body.reviewer,
//     review: req.body.review,
//     overall: req.body.overall,
//     pros: req.body.pros,
//     cons: req.body.cons,
//     reviewSubjectCount: req.body.reviewSubjectCount,
//     reviewerCount: req.body.reviewerCount,
//     userType: req.body.userType,
//     status: req.body.status,
//     reviewSubject: req.body.reviewSubject,
//     ratings: req.body.ratings,
//   });

//   Rating.findOne()
//     .then((response) => {
//       if (!response) {
//         console.log("46");
//         data.save().then((result) => {
//           res.status(200).json(result);
//         });
//       } else {
//         res.status(208).json({
//           errors: [
//             {
//               error: "Model name already exits",
//             },
//           ],
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: "Something went wrong",
//       });
//     });
// };

exports.createRating = (req, res, next) => {
  const data = new Rating({
    username: req.body.username,
    reviewer: req.body.reviewer,
    review: req.body.review,
    overall: req.body.overall,
    pros: req.body.pros,
    cons: req.body.cons,
    reviewSubjectCount: req.body.reviewSubjectCount,
    reviewerCount: req.body.reviewerCount,
    userType: req.body.userType,
    status: req.body.status,
    reviewSubject: req.body.reviewSubject,
    ratings: req.body.ratings,
  });
  // Update reviewer count in the reviewer collection
  Reviewer.findOneAndUpdate(
    { name: req.body.reviewer },
    { $inc: { ratingCount: 1 } },
    { new: true, upsert: true }
  )
    .then((response) => {
      if (response) {
        // Reviewer count updated or new reviewer created
        console.log("Reviewer count updated:", response);
        
      } else {
        console.log("Failed to update reviewer count.");
      }
      // Find or create the reviewer in the ReviewerList table
      console.log("93")
      Reviewer.findOneAndUpdate(
        { name: req.body.reviewer },
        { new: true, upsert: true }
      )
        .then((listResponse) => {
          if (listResponse) {
            
            console.log("100",listResponse)
            // Increment the count in ReviewerList table
            listResponse.count += 1;
            listResponse
              .save()
              .then(() => {
                console.log("Count increased in ReviewerList:", listResponse);
                // Save the rating entry
                return data.save();
              })
              .then((ratingResponse) => {
                res.status(200).json(ratingResponse);
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [
                    {
                      error: "Something went wrong 116",
                    },
                  ],
                });
              });
          } else {
            console.log(
              "Failed to find or create reviewer in ReviewerList table."
            );
          }
        })
        .catch((err) => {
          res.status(500).json({
            errors: [
              {
                error: "Something went wrong 131",
              },
            ],
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          {
            error: "Something went wrong 141",
          },
        ],
      });
    });
};

// exports.createRating = (req, res, next) => {
//   const { reviewer, reviewSubject, review, pros, status, userType,overall,ratings } = req.body;

//   Rating.findOneAndUpdate(
//     { reviewer },
//     { $inc: { reviewerCount: 1 },
//       $push: { reviewersRatingDetails: { reviewer,reviewSubject, pros, status, userType,overall,ratings,review } }
//     },
//     { new: true, upsert: true }
//   )
//     .then((updatedDocument) => {
//       res.status(200).json(updatedDocument);
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: "Something went wrong",
//       });
//     });
// };

exports.deleteRating = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  Rating.findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(204).json({
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
  };
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

exports.getTotalRating = (req, res, next) => {
  // Rating.find().select({ ratingType: 1, _id: 0 })
  Rating.find()
    .select({ ratings: 1, overall: 1, AverageRating: 1 })
    .then((response) => {
      if (response) {
        response.forEach((obj) => {
          const ratings = obj.ratings.map((rating) => rating.rating);
          const sum = ratings.reduce((acc, curr) => acc + curr, 0);
          const average = sum / ratings.length;
          obj.AverageRating = average;
        });
        res.status(200).json(response);
      } else {
        res.status(404).json({
          error: "Data not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};
