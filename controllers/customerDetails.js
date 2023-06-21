const Customer= require("../models/customerDetails");
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
    cb(null, `Order/${file.originalname}`)
  },
  });

 const uploadData =
    multer({
      storage: s3Storage,
    });
exports.uploadOrder = uploadData.single("image")

exports.createCustomerDetails = async (req, res, next) => {
    try {
      const data = new Customer({
        username: req.body.username,
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        address: req.body.address,
        department: req.body.department,
        paymentMode: req.body.paymentMode,
        image: req.file.originalname,
        discount: req.body.discount,
        amount: req.body.amount,
        totalAmount: calculateTotalAmount(req.body.amount, req.body.discount)
      });
  
      const response = await data.save();
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          error: "Data not found"
        });
      }
    } catch (err) {
      res.status(500).json({
        error: `Something went wrong ${err}`
      });
    }
  };
  
  const calculateTotalAmount = (amount, discount) => {
    const totalAmount = (amount * discount) / 100;
    return totalAmount;
  };
  

exports.getCustomerDetails=(req,res,next)=>{
    let { username } = req.query;
    Customer.find({ username: username })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong" },
          ],
        });
      });
}