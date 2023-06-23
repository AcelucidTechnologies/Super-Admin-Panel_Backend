const ProductOption = require("../models/productOption")

exports.getProductOption=(req,res,next)=>{
    let { username } = req.query;
    ProductOption.find({username: username}).sort({ _id: -1 }).then((response)=>{
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
  

  exports.createProductOption = (req, res, next) => {
    let data = new ProductOption({
        username: req.body.username,
        productName: req.body.productName
    });
    ProductOption.findOne({ productName: data.productName,
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
  
  exports.updateProductOption = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    let Data = req.body;
    ProductOption
      .findByIdAndUpdate(Id, Data, { new: true })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while updating ProductOption" }],
        });
      });
  };
  
  exports.deleteProductOption = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    ProductOption.findByIdAndDelete(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong while deleting ProductOption" },
          ],
        });
      });
  };
  
  exports.getProductOptionById = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    ProductOption.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while fetching a ProductOption" }],
        });
      });
  };