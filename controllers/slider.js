const Slider = require("../models/slider");
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
    cb(null, `Slider/${file.originalname}`);
  },
});

const uploadData = multer({
  storage: s3Storage,
});
exports.sliderImage = uploadData.single("image");

exports.createSlider = (req, res, next) => {
  let Data = new Slider({
    username: req.body.username,
    sliderName: req.body.sliderName,
    sliderOrder: req.body.sliderOrder,
    sliderDiscription: req.body.sliderDiscription,
    image: req.file.originalname,
  });

  Slider.findOne({ sliderName: Data.sliderName, username: Data.username })
    .then((response) => {
      if (!response) {
        Data.save().then((result) => {
          res.status(200).json(result);
        });
      } else {
        res.status(208).json({
          errors: [
            {
              error: "Slider name already exits",
            },
          ],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "something went wrong",
      });
    });
};

exports.getSlider = (req, res, next) => {
  let { username } = req.query;
  Slider.find({ username: username })
    .then((response) => {
      if (response[0]) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          result: "Data not Found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: `Something went wrong ${err}`,
      });
    });
};

  exports.updateSlider = (req, res, next) => {
    let Id;
    req.query.id ? (Id = req.query.id) : next();
    let data = {
      sliderName: req.body.sliderName,
      sliderOrder: req.body.sliderOrder,
      sliderDiscription: req.body.sliderDiscription,
      image: req.file.originalname
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
        Slider.findByIdAndUpdate(Id, data, { new: true })
          .then((response2) => {
            if (response2) {
              console.log(response2)
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

  exports.deleteSlider=(req,res,next)=>{
    let id;
    req.query.id? (Id= req.query.id): next()

    Slider.findByIdAndDelete(Id).then((response)=>{
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

  exports.getSliderById = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    Slider.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while fetching a Slider detail" }],
        });
        console.log(err);
      });
  };