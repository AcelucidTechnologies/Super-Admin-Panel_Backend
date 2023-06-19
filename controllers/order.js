
const Order = require("../models/order");

exports.getAllOrders = (req, res, next) => {
  let { username } = req.query;
  Order.find({ username: username })
    .then((response) => {
        console.log(response)
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
      console.log(err);
    });
};

exports.getOrder = (req, res, next) => {
  let  Id
  if (req.query.id) { Id = req.query.id }
  else { return next() }
    Order.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong" }],
        });
        console.log(err);
      });
  };
  
  exports.createOrder = (req, res, next) => {
    let data = new Order({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      city: req.body.city,
      pincode: req.body.pincode,
      state: req.body.state,
      landmark: req.body.landmark,
      address: req.body.address
  })
console.log(data)
data.save().then((response)=>{
    if(response){
        res.status(200).json(response)
    }else{
        res.status(404).json({
            error: "Data not found"
        })
    }
}).catch((err)=>{
    res.status(500).json({
        error: `Something went wrong ${err}`
    })
})
  }
//     let name="";
//     let address={};
//     let Data = JSON.parse(req.body.Data);
//     let amount = JSON.parse(req.body.product_quantity);
//     let changeAddress = JSON.parse(req.body.allowAddressChange);
//     console.log(Data,amount,changeAddress);
//         Order.insertMany(Data, { new: true })
//           .then((response2) => {
//             if (response2) {
             
//               res.status(200).send(response2);
//             }
//           })
//           .catch((err) => {
//             res.status(500).json({
//               errors: [{ error: "Something went wrong" }],
//             });
//             console.log(err);
//           });
//           if(changeAddress==true)
//         {
//           console.log("change address executed")
//   name = Data.customerDetails.customerName
//   address = Data.address
//   User.findOneAndUpdate({ username: name }, { address: address }).catch((err) => {
//   res.status(500).json({
//     errors: [{ error: "Something went wrong while updating Address of customer" }],
//   });
//   console.log(err);
// });
//  }
//         Data.productDetails.map((item,i)=>{
//           // console.log(item)
//           Product.findOneAndUpdate({ 'product_Detail.name' :  Data.productDetails[i].productName },{"product_Detail.Quantity":amount[i]-item.quantity}).catch((err) => {
//              res.status(500).json({
//                errors: [{ error: "Something went wrong while updating Product table" }],
//              });
//              console.log(err);
//            });
//         })  


exports.updateOrder=(req,res,next)=>{
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    pincode: req.body.pincode,
    state: req.body.state,
    landmark: req.body.landmark,
    address: req.body.address
  };
  Order.findByIdAndUpdate(Id, data, { new: true })
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
}

exports.deleteOrder = (req, res, next) => {
  let  Id
  if (req.query.id) { Id = req.query.id }
  else { return next() }
  Order.findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
            res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
      console.log(err);
    });
}

exports.getOrderById = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  Order.findById(Id)
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