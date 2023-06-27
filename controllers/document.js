const Document= require("../models/document");
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
    cb(null, `document/${file.originalname}`);
  },
});

const uploadData = multer({
  storage: s3Storage,
});
exports.uploadDocument = uploadData.single("image");

    exports.createDocument = (req, res, next) => {
        let data = new Document({
          username: req.body.username,
          fileViewed: req.body.fileViewed,
          employee: req.body.employee,
          folderName: req.body.folderName,
          fileDescription: req.body.fileDescription,
          toview: req.body.toview,
          toDownload: req.body.toDownload
        });
        if (req.file) {
          data.image = req.file.originalname;
        }
              data.save().then((result) => {
                res.status(200).json(result);
              }).catch((err)=>{
                res.status(404).json({
                    error: `data not found`
                });
              })
            
      };
      
      exports.getDocument = (req, res, next) => {
        let { username } = req.query;
        Document.find({ username: username })
          .then((response) => {
            response.map((item) => {
              if (item.image)
                item.image = process.env.bucket_path + "document/" + item.image;
            });
      
            res.status(200).json(response);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      };
      
      exports.deleteDocument = (req, res, next) => {
        let Id;
        if (req.query.id) {
          Id = req.query.id;
        } else {
          return next();
        }
        Document.findByIdAndDelete(Id)
          .then((response) => {
            if (response) {
              res.status(200).send(response);
            } else {
              res.json({
                error: "Data Already Deleted",
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              errors: [{ error: "Something went wrong" }],
            });
          });
      };
      
      exports.getDocuemntById = (req, res, next) => {
        let Id;
        if (req.query.id) {
          Id = req.query.id;
        } else {
          return next();
        }
        Document.findById(Id)
          .then((response) => {
            if (response) {
              response.image
                ? (response.image =
                    process.env.bucket_path + "document/" + response.image)
                : null;
              res.status(200).send(response);
            } else {
              res.json({
                error: "Data not Found",
              });
            }
          })
          .catch((err) => {
            res.status(500).json({
              errors: [{ error: "Something went wrong" }],
            });
          });
      };
      
      exports.updateDocument = (req, res, next) => {
        let Id;
        req.query.id ? (Id = req.query.id) : next();
        let data = {
            username: req.body.username,
            fileViewed: req.body.fileViewed,
            employee: req.body.employee,
            folderName: req.body.folderName,
            fileDescription: req.body.fileDescription,
            toview: req.body.toview,
            toDownload: req.body.toDownload
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
            Document.findByIdAndUpdate(Id, data, { new: true })
              .then((response2) => {
                if (response2) {
                  res.status(200).send(response2);
                  console.log("response2",response2)
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