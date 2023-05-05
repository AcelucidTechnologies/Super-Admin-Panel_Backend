const Slider= require("../models/slider")
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

  exports.createSlider = (req,res,next)=>{
let data= new Slider({
    sliderName: req.body.sliderName,
    sliderOrder: req.body.sliderOrder,
    sliderDiscription: req.body.sliderDiscription,
    image: req.file
})

// Slider.find
 }