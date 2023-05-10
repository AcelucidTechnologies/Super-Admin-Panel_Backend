const FeatureProduct = require("../models/featureProduct");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const bucket = require("../mediacontrol");
const { response } = require("express");
const featureProduct = require("../models/featureProduct");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
  region: "us-east-1",
});

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `Feature/${file.originalname}`);
  },
});

const uploadData = multer({
  storage: s3Storage,
});
exports.featureImage = uploadData.single("image");

// For Create Api

exports.createFeatureProduct = (req, res, next) => {
  let Data = new FeatureProduct({
    username: req.body.username,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productQuantity: req.body.productQuantity,
    productModel: req.body.productModel,
    image: req.file.originalname,
    isSpecialProduct: req.body.isSpecialProduct
  });
  console.log("44", Data);
  FeatureProduct.findOne({
    productModel: Data.productModel,
    username: Data.username,
  })
    .then((response) => {
      if (!response) {
        console.log("46");
        Data.save().then((result) => {
          res.json(result);
        });
      } else {
        res.status(208).json({
          errors: [
            {
              error: "Model name already exits",
            },
          ],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          {
            error: "Something wet wrong",
          },
        ],
      });
    });
};

// For Get Api

exports.getFeatureProduct = (req, res, next) => {
  let { username } = req.query;
  console.log("username", username);

  FeatureProduct.find({ username: username })
    .then((response) => {
      if (response[0]) {
        console.log(response);
        res.status(200).json(response);
      } else {
        res.status(404).json({
          result: "data not found",
        });
      }
    })
    .catch((err) => {
      err.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.updateFeatureProduct = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  let data = {
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productModel: req.body.productModel,
    productQuantity: req.body.productQuantity,
    image: req.file.originalname,
    isSpecialProduct: req.body.isSpecialProduct
  };
  let Data = JSON.stringify(data);
  console.log(Data);
  let check = new Promise((resolve, reject) => {
    if (Object.keys(data).includes("image")) {
      Data.image = req.file.originalname;
      resolve(true);
    } else {
      resolve(true);
    }
  });

  check.then((result) => {
    if (result) {
      FeatureProduct.findByIdAndUpdate(Id, data, { new: true })
        .then((response2) => {
          if (response2) {
            console.log(response2);
            res.status(200).json(response2);
          }
        })
        .catch((err) => {
          res.status(500).json({
            error: "Something went wrong",
          });
        });
    }
  });
};

exports.deleteFeatureProduct = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  FeatureProduct.findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
        bucket.imageDelete(response.image).then((returned) => {
          if (returned) {
            res.status(200).json(response);
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.getSpeciaProduct = (req, res, next) => {
  featureProduct
    .find({ isSpecialProduct: true })
    .then((response) => {
      if (response) {
        res.status(200).json({
          response,
        });
      } else {
        console.log("168");
        res.status(404).json({
          error: "Not a special product",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: `Something went wrong ${err}`,
      });
    });
};

exports.getAllFeatureProduct=()=>{
  FeatureProduct.find().then((response)=>{
    if(response){
      res.status(200).json(response)
    }
    else{
      res.status(404).json({
        error: "Data not Found"
      })
    }
  }).catch((err)=>{
    res.status(500).json({
      error: "Something went wrong"
    })
  })
}

exports.getFeatureProductById = (req, res, next) => {
  let  Id
  if (req.query.id) { Id = req.query.id }
  else { return next() }
  FeatureProduct.findById(Id)
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong while fetching a Feature Product detail" }],
      });
      console.log(err);
    });
};