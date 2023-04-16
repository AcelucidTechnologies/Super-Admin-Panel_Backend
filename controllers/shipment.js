const Shipment = require("../models/shipment")
const Order = require("../models/order")

exports.getAllShipmentDetails = (req, res, next) =>{
  let result=Shipment.aggregate( [
      {
        $lookup:
          {
            from: "order",
            localField: "address",
            foreignField: "_id",
            as: "address"
          }
     }
   ] )
  result.then((response)=>{
      console.log(response)
      response.map((item)=>{
          item.address[0]=item.address[0].address
      })
      res.status(200).send(response) 
  })
  } 


exports.getShipment = (req, res, next) =>{
    let  Id
  if (req.query.id) { Id = req.query.id }
  else { return next() }
    console.log(Id)
let result=Shipment.aggregate( [
    {
      $lookup:
        {
          from: "order",
          localField: "address",
          foreignField: "_id",
          as: "address"
        }
   }
 ] )
result.then((response)=>{
    console.log(response)
    response.map((item)=>{
        item.address[0]=item.address[0].address
    })
    response = response.find((item)=>item._id==Id)
    res.status(200).send(response) 
})
} 

exports.createShipment = (req, res, next) => {
    let Data = JSON.parse(req.body.Data);
    console.log(Data);
        Shipment.insertMany(Data, { new: true })
          .then((response2) => {
            if (response2) {
              res.status(200).send(response2);
            }
          })
          .catch((err) => {
            res.status(500).json({
              errors: [{ error: "Something went wrong while creating shipment details" }],
            });
            console.log(err);
          });
        }

exports.updateShipment = (req, res, next) =>{
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    let Data = JSON.parse(req.body.Data);
    // console.log(req.params)
    if(!!Data.address)
    {
        delete Data.address
    }
   Shipment.findByIdAndUpdate(Id, Data, { new: true }).then((response) => {
    if (response) {
      res.status(200).send(response);
    }
  }).catch((err) => {
    res.status(500).json({
      errors: [{ error: "Something went wrong" }],
    });
    console.log(err);
  });
} 

exports.deleteShipment = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    Shipment.findByIdAndDelete(Id)
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