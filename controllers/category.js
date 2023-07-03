const Category = require("../models/category");
const bucket = require("../mediacontrol");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

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
  cb(null, `Category/${file.originalname}`)
},
});

const uploadData =
  multer({
    storage: s3Storage,
  });
exports.categoryImage = uploadData.single("image")

exports.getAllCategory = (req, res, next) => {
  Category.find().sort({categoryOrder: 1})
    .then((response) => {
      if (response) {
        response.map((item) => {
          item.image = process.env.bucket_path + "Category/" + item.image;
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

exports.getCategoryById = (req, res, next) => {
  let  Id
 (req.query.id)?Id = req.query.id:next()
  Category.findById(Id)
    .then((response) => {
      if (response) {
        response.image = process.env.bucket_path + response.image;
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

// exports.updateCategory = (req, res, next) => {
//   let  Id
//   (req.query.id)?Id = req.query.id:next()
//   let Data = JSON.stringify(req.body);
//   let check = new Promise((resolve, reject) => {
//     if (Object.keys(Data).includes("image")) {
//         Data.image = req.file.originalname;
//         resolve(true);
//     } else {
//       resolve(true);
//     }
//   });
//   check.then((result) => {
//     if (result) {
//       console.log(req.body.Id);
//       Category.findByIdAndUpdate(Id, Data, { new: true })
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

exports.updateCategory = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  let data = {
    username: req.body.username,
    categoryName: req.body.categoryName,
    subCategory: req.body.subCategory,
    status: req.body.status,
    categoryOrder: req.body.categoryOrder,
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
      Category
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
exports.deleteCategory = (req, res, next) => {
  let  Id
  (req.query.id)?Id = req.query.id:next()
  Category.findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
        bucket.imageDelete(response.image).then((returned)=>{
         console.log(returned)
         if (returned) res.status(200).send(response);
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
      console.log(err);
    });
};

exports.createCategory=(req,res,next)=>{
  let data= new Category({
    username: req.body.username,
    categoryName: req.body.categoryName,
    subCategory: req.body.subCategory,
    status: req.body.status,
    categoryOrder: req.body.categoryOrder,
    image: req.file.originalname,
  });
  Category.findOne({categoryName: data.categoryName,
    username:data.username})
    .then((response) => {
      if (!response) {
        data.save().then((result) => {
          res.status(200).json(result);
        });
      } else {
        res.status(404).json({
          errors: [
            {
              error: "Category name is already exits",
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

