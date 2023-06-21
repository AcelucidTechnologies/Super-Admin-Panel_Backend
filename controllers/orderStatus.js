const orderStatus= require("../models/orderStatus");

exports.CreateOrderStatus=(req,res,next)=>{
    let data= new orderStatus({
        username: req.body.username,
        orderList: req.body.orderList,
        orderStatus: req.body.orderStatus
    })

    data.save().then((response)=>{
        if(response){
            res.status(200).json(response)
        }
    }).catch((err)=>{
        res.status(500).json({
            error: "Something went wrong"
        })
    })
}

exports.getOrderStatus = (req, res, next) => {
    let { username } = req.query;
    orderStatus.find({ username: username })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  };
  
  exports.deleteOrderStatus = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    orderStatus.findByIdAndDelete(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        } else {
          res.json({
            error: "Data Already Deleted",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong" }],
        });
      });
  };
  
  exports.getOrderStatusById = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    orderStatus.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        } else {
          res.json({
            error: "Data not Found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong" }],
        });
      });
  };

  exports.updateOrderStatus = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    let Data = req.body;
    orderStatus.findByIdAndUpdate(Id, Data, { new: true })
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