const BannerSpecial = require("../models/bannerSpecial");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const bucket = require("../mediacontrol");
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

// For Get Api 

exports.getBannerSpecial = (req, res, next) => {
  let { username } = req.query;
  BannerSpecial.find({username: username}).sort({ bannerOrder: 1 }).then((response) => {
    response.map((item) => {
      if(item.image)
      item.image = process.env.bucket_path +"Banner/" + item.image;
    });
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// For Create Api 

exports.createBannerSpecial = (req, res, next) => {
  let data = new BannerSpecial({
    username: req.body.username,
    bannerName: req.body.bannerName,
    bannerOrder: req.body.bannerOrder,
    bannerDescription: req.body.bannerDescription,
    image: req.file.originalname,
  });
  BannerSpecial
    .findOne({ bannerName: data.bannerName,
    username:data.username})
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

// For Update Api 
exports.updateBannerSpecial = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  let data = {
    username: req.body.username,
    bannerName: req.body.bannerName,
    bannerOrder: req.body.bannerOrder,
    bannerDescription: req.body.bannerDescription,
   // image: req.file.originalname,
  };

  let check = new Promise((resolve, reject) => {
    if (req.file) {
      data.image = req.file.originalname;
      resolve(true);
    } else {
      resolve(true);
    }
  });
  check.then((result) => {
    if (result) {
      BannerSpecial
        .findByIdAndUpdate(Id, data, { new: true })
        .then((response2) => {
          if (response2) {
            res.status(200).send(response2);
          }
        })
        .catch((err) => {
          res.status(500).json({
            errors: [{ error: `Something went wrong ${err} ` }],
          });
        });
    }
  });
};

  // For Delete Api 
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
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};

exports.getAllBannerData=(req,res,next)=>{
BannerSpecial.find().then((response)=>{
  if(response){
    res.status(200).json(response)
  }
  else{
    res.status(208).json({
      error: "Data not Found"
    })
  }
}).catch((err)=>{
  res.status(500).json({
  error: "Something went wrong"
  })
})
}

exports.getBannerDataById = (req, res, next) => {
  let  Id
  if (req.query.id) { Id = req.query.id }
  else { return next() }
  BannerSpecial.findById(Id).then((response) => {
   
    if (response) {
      response.image?response.image=process.env.bucket_path + "Banner/" + response.image:null;
          res.status(200).send(response);
    }
  })
  .catch((err) => {
    res.status(500).json({
      errors: [{ error: "Failed to fetch user details" }],
    });
  }); 
};


