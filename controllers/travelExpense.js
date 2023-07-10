const Reimbursement = require("../models/travelExpense");
const sgMail = require("@sendgrid/mail");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const bucket = require("../mediacontrol");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    cb(null, `Reimbursement/${file.originalname}`);
  },
});

const uploadData = multer({
  storage: s3Storage,
});
exports.reimbursementImage = uploadData.single("image");




exports.createReimbursement = (req, res, next) => {
  const journeyDate = new Date(req.body.journeyDate);
  const returnDate = new Date(req.body.returnDate);

  if (journeyDate > returnDate) {
    return res.status(200).json({ error: "invalid value for journey date" });
  }

  const {
    username,
    employeeId,
    employeeName,
    travelFrom,
    travelTo,
    purposeTravel,
    modifiedBy,
    addedBy,
    totalReimbursementAmount,
  } = req.body;

  if (!addedBy || !Array.isArray(addedBy) || addedBy.length === 0) {
    return res.status(400).json({
      error: "Must provide at least one valid email address in the 'addedBy' field.",
    });
  }

  const data = new Reimbursement({
    username,
    employeeId,
    employeeName,
    journeyDate,
    returnDate,
    travelFrom,
    travelTo,
    purposeTravel,
    modifiedBy,
    addedBy,
    totalReimbursementAmount
  });

  if (req.file) {
    data.image = req.file.originalname;
  }

  data
    .save()
    .then((result) => {
      const emailContent = `
        <p>${username},</p>
        <p>Reimbursement approval message</p>
        <a href="http://13.126.212.31/">Click here to approve</a>
      `;
      addedBy.forEach((recipient) => {
        const msg = {
          to: recipient,
          from: "himanshu.975677@gmail.com",
          subject: "Reimbursement Approval",
          html: emailContent,
        };
        sgMail
          .send(msg)
          .then(() => console.log(`Email sent to ${recipient}`))
          .catch((error) => console.error(`Error sending email to ${recipient}:`, error));
      });

      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};


exports.getReimbursement=(req,res,next)=>{
    Reimbursement.find()
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(208).json({
          errors: [
            { error: "no data" },
          ],
        });
      });
}


exports.getReimbursementById = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    Reimbursement.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
        else{
            res.status(208).json({
                error: "Data not Found"
            })
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong" },
          ],
        });
      });
  };

  exports.updateReimbursement = (req, res, next) => {
    let Id;
    req.query.id ? (Id = req.query.id) : next();
    let data = {
      username: req.body.username,
      employeeId: req.body.employeeId,
      employeeName: req.body.employeeName,
      journeyDate: req.body.journeyDate,
      returnDate: req.body.returnDate,
      travelFrom: req.body.travelFrom,
      travelTo: req.body.travelTo,
      purposeTravel: req.body.purposeTravel,
      modifiedBy: req.body.modifiedBy,
      totalReimbursementAmount: req.body.totalReimbursementAmount,
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
        Reimbursement.findByIdAndUpdate(Id, data, { new: true })
          .then((response2) => {
            if (response2) {
              console.log(response2)
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


exports.deleteReimbursement = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    Reimbursement.findByIdAndDelete(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
        else{
            res.json({
                error: "Data Already Deleted"
            })
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong" },
          ],
        });
      });
  };

  exports.approveReimbursement = (req, res, next) => {
    const reimbursementId = req.query.id;
    Reimbursement.findById(reimbursementId)
      .then((reimbursement) => {
        if (!reimbursement) {
          return res.status(404).json({
            error: "Reimbursement not found.",
          });
        }
     
        if (reimbursement.status === "Done") {
          return res.status(200).json({
            error: "Reimbursement is already Approved.",
          });
        }
   
        reimbursement.status = "Done";
        reimbursement.save().then((result) => {
        return res.status(200).json({
            message: "Reimbursement Approved Successfully",
          });
        });
  
        // Send email
        const emailContent = `
            <p>Your Reimbursement application has been Approved.</p>
            `;
        const msg = {
          to: `${reimbursement.username}`,
          from: "himanshu.975677@gmail.com",
          subject: "Reimbursement Approval",
          html: emailContent,
        };
        sgMail.send(msg);
      })
      .catch((err) => {
        res.status(500).json({
          error: "Something went wrong while Approving the Reimbursement.",
        });
      });
    }