const Product = require("../models/product");
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
    cb(null, `Product/${file.originalname}`);
  },
});

const uploadData = multer({
  storage: s3Storage,
});
exports.productImage = uploadData.single("image");

exports.getAllProduct = (req, res, next) => {
  Product.find()
    .then((response) => {
      if (response) {
        response.map((item) => {
          item.images = process.env.bucket_path + item.images;
          item.videos = process.env.bucket_path + item.videos;
        });
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

exports.getProduct = (req, res, next) => {
  let { username } = req.query;
  Product.find({ username: username })
    .then((response) => {
      if (response) {
        response.images =
          process.env.bucket_path + "Product/" + response.images;
        response.videos = process.env.bucket_path + response.videos;
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

// exports.createProduct = (req, res, next) => {
//   let Data = JSON.parse(req.body.Data);
//   let resultdata = "";
//   let resultvideodata = "";
//   let check = new Promise((resolve, reject) => {
//         bucket.videoUpload(req.files.video[0]).then((ret) => {
//           resultvideodata = ret;
//           if (!!resultvideodata) {
//             // console.log([resultdata, resultvideodata]);
//             Data.images = req.files.image[0].originalname;
//             Data.videos = req.files.video[0].originalname;
//           }
//           resolve(true);
//         });
//   });
//   check.then((result) => {
//     if (result) {
//       console.log(result);
//       Product.insertMany(Data, { new: true })
//         .then((response2) => {
//           if (response2) {
//             res.status(200).send(response2);
//           }
//         })
//         .catch((err) => {
//           res.status(500).json({
//             errors: [{ error: "Something went wrong" }],
//           });
//           console.log(err);
//         });
//     }
//   });
// };

exports.createProduct = (req, res, next) => {
  let data = new Product({
    username: req.body.username,
    productName: req.body.productName,
    categoryName: req.body.categoryName,
    model: req.body.model,
    ourPrice: req.body.ourPrice,
    marketPrice: req.body.marketPrice,
    productWeight: req.body.productWeight,
    weightType: req.body.weightType,
    productDescription: req.body.productDescription,
    status: req.body.status,
    image: req.file.originalname,
  });
  console.log(data);
  Product.findOne({ productName: data.productName, username: data.username })
    .then((response) => {
      if (!response) {
        data.save().then((result) => {
          res.json(result);
        });
      } else {
        res.status(404).json({
          errors: [
            {
              error: "Product name is already exits",
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

exports.updateProduct = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  let Data = JSON.parse(req.body.Data);
  let resultdata = "";
  let resultvideodata = "";
  let check = new Promise((resolve, reject) => {
    if (
      Object.keys(Data).includes("videos") &&
      Object.keys(Data).includes("images")
    ) {
      bucket.videoUpload(req.files.video[0]).then((ret) => {
        resultvideodata = ret;
        if (!!resultvideodata) {
          // console.log([resultdata, resultvideodata]);
          Data.images = req.files.image[0].originalname;
          Data.videos = req.files.video[0].originalname;
        }
        resolve(true);
      });
    } else if (Object.keys(Data).includes("images")) {
      Data.images = req.files.image[0].originalname;
      resolve(true);
    } else if (Object.keys(Data).includes("videos")) {
      bucket.videoUpload(req.files.video[0]).then(() => {
        Data.videos = req.files.video[0].originalname;
        resolve(true);
      });
    } else {
      resolve(true);
    }
  });
  check.then((result) => {
    if (result) {
      Product.findByIdAndUpdate(Id, Data, { new: true })
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

exports.deleteProduct=(req,res,next)=>{
  let  Id
  (req.query.id)?Id = req.query.id:next()
  Product.findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
        bucket.imageDelete(response.image).then((returned)=>{
         if (returned) res.status(200).send(response);
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
}

// exports.deleteProduct = (req, res, next) => {
//   // bucket.listfiles();
//   let resultdata, resultvideodata;
//   let Id;
//   req.query.id ? (Id = req.query.id) : next();
//   Product.findByIdAndDelete(Id)
//     .then((response) => {
//       if (response) {
//         bucket.imageDelete(response.images).then((returned) => {
//           resultdata = returned;
//           bucket.videoDelete(response.videos).then((ret) => {
//             resultvideodata = ret;
//             res.status(200).send(response);
//             if (resultdata == true && resultvideodata == true) {
//               bucket.listfiles();
//             }
//           });
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         errors: [{ error: "Something went wrong" }],
//       });
//       console.log(err);
//     });
// };

