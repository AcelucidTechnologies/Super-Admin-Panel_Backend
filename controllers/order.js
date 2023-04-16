const { forEach, map } = require("lodash");
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user")

exports.getAllOrders = (req, res, next) => {
  Order.find()
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
    let name="";
    let address={};
    let Data = JSON.parse(req.body.Data);
    let amount = JSON.parse(req.body.product_quantity);
    let changeAddress = JSON.parse(req.body.allowAddressChange);
    console.log(Data,amount,changeAddress);
        Order.insertMany(Data, { new: true })
          .then((response2) => {
            if (response2) {
             
              res.status(200).send(response2);
            }
          })
          .catch((err) => {
            res.status(500).json({
              errors: [{ error: "Something went wrong" }],
            });
            console.log(err);
          });
          if(changeAddress==true)
        {
          console.log("change address executed")
  name = Data.customerDetails.customerName
  address = Data.address
  User.findOneAndUpdate({ username: name }, { address: address }).catch((err) => {
  res.status(500).json({
    errors: [{ error: "Something went wrong while updating Address of customer" }],
  });
  console.log(err);
});
 }
        Data.productDetails.map((item,i)=>{
          // console.log(item)
          Product.findOneAndUpdate({ 'product_Detail.name' :  Data.productDetails[i].productName },{"product_Detail.Quantity":amount[i]-item.quantity}).catch((err) => {
             res.status(500).json({
               errors: [{ error: "Something went wrong while updating Product table" }],
             });
             console.log(err);
           });
        })  
        }

  exports.updateOrder = (req, res, next) => {
    let  Id
    let name='';
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    let Data = JSON.parse(req.body.Data);
    let changeAddress = JSON.parse(req.body.allowAddressChange);
    console.log(Data);
        Order.findByIdAndUpdate(Id, Data, { new: true })
          .then((response2) => {
            if (response2) {
              res.status(200).send(response2);
            }
          })
          .catch((err) => {
            res.status(500).json({
              errors: [{ error: "Something went wrong" }],
            });
            console.log(err);
          });
          if(!!(Data.address) && changeAddress)
          {
            name = Data.customerDetails.customerName
  address = Data.address
  User.findOneAndUpdate({ username: name }, { address: address }).catch((err) => {
    res.status(500).json({
      errors: [{ error: "Something went wrong while updating Address of customer" }],
    });
    console.log(err);
  });
   }
if(req.body.product_quantity_diff)
{ 
  let amount_diff = JSON.parse(req.body.product_quantity_diff);
  let amount = JSON.parse(req.body.product_quantity);
          Data.productDetails.map((item,i)=>{
            // console.log(item)
            Product.findOneAndUpdate({ 'product_Detail.name' :  Data.productDetails[i].productName },{"product_Detail.Quantity":amount[i]-amount_diff[i]}, { new: true }).catch((err) => {
               res.status(500).json({
                 errors: [{ error: "Something went wrong while updating Product table" }],
               });
               console.log(err);
             });
          })
  }
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