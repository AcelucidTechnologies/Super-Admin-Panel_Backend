const LeaveTracker = require("../models/leaveTracker");
const TotalLeave = require("../models/totalLeaves");
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const sgMail = require("@sendgrid/mail");
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
    cb(null, `leaveTracker/${file.originalname}`);
  },
});

const uploadData = multer({
  storage: s3Storage,
});
exports.uploadLeave = uploadData.single("image");

exports.getLeaveTracker = (req, res, next) => {
  let { username } = req.query;
  LeaveTracker.find({ username: username })
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [
          {
            error: "Something went wrong while fetching Leave Tracker details",
          },
        ],
      });
    });
};

exports.deleteLeaveTracker = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  LeaveTracker.findByIdAndDelete(Id)
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

exports.getLeaveTrackerById = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  LeaveTracker.findById(Id)
    .then((response) => {
      if (response) {
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


exports.createLeaveTracker = (req, res, next) => {
  const {
    username,
    leaveType,
    appliedTo,
    fromDate,
    toDate,
    contactNo,
    altContactNo,
    reason,
  } = req.body;

  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  const today = new Date();

  const oneDay = 24 * 60 * 60 * 1000;
  const numberOfDays = Math.ceil((endDate - startDate + oneDay) / oneDay);

  if (numberOfDays <= 0) {
    return res.status(400).json({
      error:
        "Invalid date range. 'toDate' should be greater than or equal to 'fromDate'.",
    });
  }

  TotalLeave.findOneAndUpdate({ username }, {}, { upsert: true, new: true })
    .then((totalLeave) => {
      if (!totalLeave) {
        return res.status(400).json({
          error: "Total leave count not found for the user.",
        });
      }

      if (leaveType === "earned") {
        const minAllowedDate = new Date();
        minAllowedDate.setDate(today.getDate() + 3); // Add 3 days to today's date
      
        if (startDate <= minAllowedDate) {
          return res.status(400).json({
            error: "Earned leave can apply only before three days.",
          });
        }
      }

      const updatedLeaveCount = totalLeave[leaveType] - numberOfDays;
      if (updatedLeaveCount < 0) {
        return res.status(400).json({
          error: "Insufficient leave balance.",
        });
      }

      totalLeave[leaveType] = updatedLeaveCount;

      const leaveTracker = new LeaveTracker({
        username,
        leaveType,
        appliedTo,
        fromDate: startDate,
        toDate: endDate,
        contactNo: parseInt(contactNo),
        altContactNo: parseInt(altContactNo),
        reason,
      });

      if (req.file) {
        leaveTracker.image = req.file.originalname;
      }

      return leaveTracker.save().then(() => {
        // Send email
      //   const emailContent = `
      //     <p>${username},</p>
      //     <p>${reason}<p>
      //     <p>Please click on the below link to review and approve/disapprove the leave:</p>
      //     <a href="http://13.126.212.31/">Click here to approve</a>
      //   `;

      //   const msg = {
      //     to: "himanshu.aswal@acelucid.com",
      //     from: "shivam.rawat@acelucid.com",
      //     subject: "Leave Approval",
      //     html: emailContent,
      //   };

      //   return sgMail.send(msg).then(() => {
      //     
      //   });
      res.status(200).json({ leaveTracker, totalLeave });
       });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong while saving the leave.",
      });
    });
};


exports.approve = (req, res, next) => {
  const leaveTrackerId = req.query.id;

  LeaveTracker.findById(leaveTrackerId)
    .then((leaveTracker) => {
      if (!leaveTracker) {
        return res.status(400).send("Leave tracker not found.");
      }

      leaveTracker.status = "approved";
      return leaveTracker.save();
    })
    .then((leaveTracker) => {
      return TotalLeave.findOne({ username: leaveTracker.username })
        .then((totalLeave) => {
          if (!totalLeave) {
            throw new Error("Total leave count not found for the user.");
          }

          const numberOfDays = Math.ceil(
            (leaveTracker.toDate - leaveTracker.fromDate + 24 * 60 * 60 * 1000) /
            (24 * 60 * 60 * 1000)
          );

          if (leaveTracker.leaveType === "compOff") {
            totalLeave[leaveTracker.leaveType] += 1;
          } 
          else {
            totalLeave[leaveTracker.leaveType] -= numberOfDays-1;
          }
          return totalLeave.save();
        })
        .then(() => {
          const msg = {
            to: "himanshu.aswal@acelucid.com",
            from: "shivam.rawat@acelucid.com",
            subject: "Leave Request Approved",
            html: "<p>Your leave request has been approved.</p>",
          };
          return sgMail.send(msg);
        })
        .then(() => {
          res.status(200).send("Leave request approved successfully.");
        })
        .catch((err) => {
          throw new Error("An error occurred the leave request.");
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred approving the leave request.");
    });
};


exports.disapprove=(req,res,next)=>{

}
