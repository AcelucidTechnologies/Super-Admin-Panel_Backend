const AddAddons = require("../models/addAdons");

exports.getAddAddons = (req, res, next) => {
  let { username } = req.query;
  AddAddons.find({ username: username })
    .sort({ _id: -1 })
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

exports.createAddAddons = (req, res, next) => {
  let data = new AddAddons({
    username: req.body.username,
    addonName: req.body.addonName,
    addonCode: req.body.addonCode,
    Comment: req.body.Comment,
    price: req.body.price,
    addonType: req.body.addonType,
    pricing: req.body.pricing,
    associatedPlans: req.body.associatedPlans,
  });
  
  AddAddons.findOne({ addonCode: data.addonCode, username: data.username })
    .then((response) => {
      if (!response) {
        data.save().then((result) => {
          res.status(200).json(result);
        });
      } else {
        res.status(208).json({
          error: "Coupon Code already exits",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.updateAddAddons = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  let Data = req.body;
  AddAddons.findByIdAndUpdate(Id, Data, { new: true })
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while updating Addons" },
        ],
      });
    });
};

exports.deleteAddAddons = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  AddAddons.findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while deleting Addons" },
        ],
      });
    });
};

exports.getAddAddonsById = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  AddAddons.findById(Id)
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while fetching a Addons" },
        ],
      });
    });
};
