const BannerSpecial = require("../models/bannerSpecial");
const image = require("../mediacontrol");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const bucket = require("../mediacontrol");
// let abc = new bannerSpecial({
//   name:name
// })
// abc.save()
//image upload

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
    cb(null, `Banner/${file.originalname}`)
  },
  });

 const uploadData =
    multer({
      storage: s3Storage,
    });
exports.uploadImage = uploadData.single("image")

exports.getBannerSpecial = (req, res, next) => {
  let { username } = req.query;
  console.log("usename", username);

  BannerSpecial
    .find({ username: username })
    .then((response) => {
      if (response) {
        console.log("data");
        res.status(200).send(response);
      } else {
        res.status(404).JSON(["not found data"]);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          {
            error: "something went wrong",
          },
        ],
      });
      console.log(error);
    });
};

exports.createBannerSpecial = (req, res, next) => {
  let data = new BannerSpecial({
    username: req.body.username,
    bannerName: req.body.bannerName,
    bannerOrder: req.body.bannerOrder,
    bannerDescription: req.body.bannerDescription,
    image: req.file.originalname,
  });
  bannerSpecial
    .findOne({ bannerName: data.bannerName })
    .then((response) => {
      if (!response) {
        data.save().then((result) => {
          res.json(result);
        });
      } else {
        res.status(404).json({
          errors: [
            {
              error: "Banner name is already exits",
            },
          ],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          {
            error: "something went wrong",
          },
        ],
      });
    });
};

exports.updateBannerSpecial = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  let data = {
    username: req.body.username,
    bannerName: req.body.bannerName,
    bannerOrder: req.body.bannerOrder,
    bannerDescription: req.body.bannerDescription,
    image: req.file.originalname,
  };
  let Data = JSON.stringify(data);
  console.log("90", Data);
  console.log("90", data);
  let check = new Promise((resolve, reject) => {
    if (Object.keys(data).includes("image")) {
      Data.image = req.file.originalname;
      resolve(true);
    } else {
      console.log("116");
      resolve(true);
    }
  });
  check.then((result) => {
    if (result) {
      BannerSpecial
        .findByIdAndUpdate(Id, data, { new: true })
        //console.log("103",Data)
        .then((response2) => {
          if (response2) {
            res.status(200).send(response2);
          }
        })
        .catch((err) => {
          res.status(500).json({
            errors: [{ error: "Something went wrong" }],
          });
        });
    }
  });
};

exports.deleteBannerSpecial = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  BannerSpecial
    .findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
        bucket.imageDelete(response.image).then((returned) => {
          if (returned) res.status(200).send(response);
        });
      }
    })
    .catch((err) => {
      console.log(163);
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};
