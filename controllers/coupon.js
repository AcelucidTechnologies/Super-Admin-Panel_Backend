const Coupon = require("../models/coupon")
exports.getAllCoupon = (req, res, next) => {
    
    Coupon.find().then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    }).catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while fetching all coupon details" }],
        });
        console.log(err);
      });
}

exports.getCouponDetail = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    Coupon.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while fetching a coupon detail" }],
        });
        console.log(err);
      });
  };

  exports.createCoupon = (req, res, next) => {
    let Data = JSON.parse(req.body.Data);
    console.log(Data);
        Coupon.insertMany(Data, { new: true })
          .then((response2) => {
            if (response2) {
              res.status(200).send(response2);
            }
          })
          .catch((err) => {
            res.status(500).json({
              errors: [{ error: "Something went wrong while creating Coupon details" }],
            });
            console.log(err);
            });
  };

  exports.updateCouponDetail = (req, res, next) =>{
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    let Data = JSON.parse(req.body.Data);
    // console.log(req.params)
   Coupon.findByIdAndUpdate(Id, Data, { new: true }).then((response) => {
    if (response) {
      res.status(200).send(response);
    }
  }).catch((err) => {
    res.status(500).json({
      errors: [{ error: "Something went wrong while updating coupon detail" }],
    });
  });
} 

exports.deleteCoupon = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    Coupon.findByIdAndDelete(Id)
      .then((response) => {
        if (response) {
              res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while deleting coupon detail" }],
        });
        console.log(err);
      });
  }