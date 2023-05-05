const FeatureProduct = require("../models/featureProduct");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const bucket = require("../mediacontrol");
const { response } = require("express");

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
        res.status(404).json({
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
  console.log("usename", username);

  FeatureProduct.find({ username: username })
    .then((response) => {
      if (response[0]) {
        console.log(response);
        console.log("83");
        res.status(200).json(response);
      } else {
        console.log("87");
        res.status(400).json({
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

exports.deleteFeatureProduct= (req,res,next)=>{
let Id;
req.query.id ?(Id = req.query.id): next()
FeatureProduct.findByIdAndDelete(Id).then((response)=>{
    if(response){
  bucket.imageDelete(response.image).then((returned)=>{
    if(returned){
        res.status(200).json(response);
    }
  })
    }
}).catch((err)=>{
    res.status(500).json({
        error: "Something went wrong"
    })
})
}