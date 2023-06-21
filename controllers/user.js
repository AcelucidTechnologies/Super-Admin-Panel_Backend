const User = require("../models/userModule");

exports.createUserList = (req, res, next) => {
  let data = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.Phone,
    role: req.body.role,
    status: req.body.status,
  });
  User.findOne({ email: data.email, username: data.username })
    .then((response) => {
      if (!response) {
        data.save().then((result) => {
          res.status(200).json(result);
        });
      } else {
        res.status(208).json({
          error: "Email Already Exits",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.getUserList = (req, res, next) => {
  let { username } = req.query;
  User.find({ username: username })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({
        error: "Data not found",
      });
    });
};

exports.getUserListById = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  User.findById(Id)
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while fetching a Page set detail" },
        ],
      });
    });
};

exports.deleteUserList = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    User.findByIdAndDelete(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
        else{
            res.json({
                error: "Data Already Deleted"
            })
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong" },
          ],
        });
      });
  };

  exports.updateUserList = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    let Data = req.body;
    User.findByIdAndUpdate(Id, Data, { new: true })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
        else{
            res.json({
                error: "Data not Found"
            })
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong" },
          ],
        });
      });
  };