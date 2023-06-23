const AddCoupon = require("../models/addCoupon");

exports.getAddCoupon = (req, res, next) => {
  let { username } = req.query;
  AddCoupon.find({ username: username })
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

exports.createAddCoupon = (req, res, next) => {
  let data = new AddCoupon({
    username: req.body.username,
    couponName: req.body.couponName,
    couponCode: req.body.couponCode,
    discountPrice: req.body.discountPrice,
    redemptionType: req.body.redemptionType,
    associatedPlans: req.body.associatedPlans,
    associatedAddons: req.body.associatedAddons,
    validUpto: req.body.validUpto,
    maximumRedemptions: req.body.maximumRedemptions,
  });
  AddCoupon.findOne({ couponCode: data.couponCode, username: data.username })
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

exports.updateAddCoupon = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  let Data = req.body;
  AddCoupon.findByIdAndUpdate(Id, Data, { new: true })
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while updating Coupon Code" },
        ],
      });
    });
};

exports.deleteAddCoupon = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  AddCoupon.findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while deleting Coupon Code" },
        ],
      });
    });
};

exports.getAddCouponById = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  AddCoupon.findById(Id)
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while fetching a Coupon Code" },
        ],
      });
    });
};
