const Subscription= require("../models/subscriptionPlan.js")

exports.getSubscription=(req,res,next)=>{
    let { username } = req.query;
    Subscription.find({username: username}).sort({ _id: -1 }).then((response)=>{
        if(response[0]){
            res.status(200).json(response)
        }else{
            res.status(404).json({
                error: "Data not found"
            })
        }
    }).catch((err)=>{
        res.status(500).json({
            error: `Something went wrong`
        })
    })
  }
  

  exports.createSubscription = (req, res, next) => {
    let data = new Subscription({
        username: req.body.username,
        planName: req.body.planName,
        planCode: req.body.planCode,
        price: req.body.price,
        billEvery: req.body.billEvery,
        billingCycle: req.body.billingCycle,
        planInDays: req.body.planInDays,
        comment: req.body.comment
    });
    Subscription.findOne({ planCode: data.planCode,
      username: data.username }).then(
      (response) => {
        if (!response) {
          data.save().then((result) => {
            res.status(200).json(result);
          });
        }
        else{
          res.status(208).json({
            error: "Data already exits"
          })
        }
      }
    ).catch((err)=>{
      res.status(500).json({
        error: "Something went wrong"
      })
    })
  };
  
  exports.updateSubscription = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    let Data = req.body;
    Subscription
      .findByIdAndUpdate(Id, Data, { new: true })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while updating Rating Criteria" }],
        });
      });
  };
  
  exports.deleteSubscription = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    Subscription.findByIdAndDelete(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong while deleting Subscription plan" },
          ],
        });
      });
  };
  
  exports.getSubscriptionById = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    Subscription.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while fetching a Subscription Plan" }],
        });
      });
  };