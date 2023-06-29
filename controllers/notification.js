const Notification = require("../models/notification");

exports.updateNotification = (req, res, next) => {
  let Id = req.query.id;
  Notification.findById(Id)
    .then((notification) => {
      if (!notification) {
        return res.status(200).json("Data not found");
      }
      notification.isNotificationStatus = true;
      notification.save().then((result) => {
        res.status(200).json({
          message: "Notification update successfully",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.getNotification = (req, res, next) => {
  Notification.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
