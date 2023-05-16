const Coupon = require("../models/coupon");

exports.getAllCoupon = (req, res, next) => {
  let { username } = req.query;
  Coupon.find({ username: username })
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while fetching all coupon details" },
        ],
      });
      console.log(err);
    });
};

// exports.getCouponDetail = (req, res, next) => {
//     let  Id
//     if (req.query.id) { Id = req.query.id }
//     else { return next() }
//     Coupon.findById(Id)
//       .then((response) => {
//         if (response) {
//           res.status(200).send(response);
//         }
//       })
//       .catch((err) => {
//         res.status(500).json({
//           errors: [{ error: "Something went wrong while fetching a coupon detail" }],
//         });
//         console.log(err);
//       });
//   };

exports.createCoupon = (req, res, next) => {
  // let Data = JSON.parse(req.body.Data);
  // console.log(Data);
  let Data = new Coupon({
    username: req.body.username,
    couponName: req.body.couponName,
    couponCode: req.body.couponCode,
    coupontype: req.body.coupontype,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    maxDiscount: req.body.maxDiscount,
    minDiscount: req.body.minBillAmount,
    discount: req.body.discount,
    category: req.body.category,
    product: req.body.product,
    usesPerCoupon: req.body.usesPerCoupon,
    userPerCoupon: req.body.userPerCoupon
  });
  let data = req.body;
  console.log("data", data);
  Coupon.findOne({ couponCode: Data.couponCode, username: Data.username })
    .then((response) => {
      if (!response) {
        Data.save().then((result) => {
          res.status(200).json(result);
        });
      } else {
        res.status(208).json({
          error: "Page Title already exit",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.updateCouponDetail = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  let Data = req.body;
  console.log(Data);
  Coupon.findByIdAndUpdate(Id, Data, { new: true })
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while updating coupon detail" },
        ],
      });
    });
};

exports.deleteCoupon = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  Coupon.findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while deleting coupon detail" },
        ],
      });
      console.log(err);
    });
};

exports.getCouponDataById = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  Coupon.findById(Id)
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          { error: "Something went wrong while fetching a coupon detail" },
        ],
      });
      console.log(err);
    });
};
