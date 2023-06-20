const createOrder = require("../models/createOrder");

exports.CreateOrder = (req, res, next) => {
  let data = new createOrder({
    username: req.body.username,
    mobileNo: req.body.mobileNo,
  });

  data
    .save()
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          error: "Data not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Somehing went wrong",
      });
    });
};
