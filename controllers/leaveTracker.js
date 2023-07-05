const LeaveTracker = require("../models/leaveTracker");
const TotalLeave = require("../models/totalLeaves");
const Notification= require("../models/notification")
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
        const formattedResponse = response.map((item) => ({
          ...item._doc,
          fromDate: new Date(item.fromDate).toISOString().split("T")[0],
          toDate: new Date(item.toDate).toISOString().split("T")[0],
        }));
        res.status(200).json(formattedResponse);
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
    subject,
    toDate,
    contactNo,
    altContactNo,
    reason,
  } = req.body;

  if (!appliedTo || !Array.isArray(appliedTo) || appliedTo.length === 0) {
    return res.status(400).json({
      error: "Must provide at least one valid email address in the 'appliedTo' field.",
    });
  }

  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const numberOfDays = Math.ceil((endDate - startDate + oneDay) / oneDay);

  if (numberOfDays <= 0) {
    return res.status(200).json({
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
          return res.status(200).json({
            error: "Earned leave can apply only before three days.",
          });
        }
      }
      let updatedLeaveCount;
      if (leaveType !== "compOff" && leaveType !== "leaveWithoutpay") {
        updatedLeaveCount = totalLeave[leaveType] - numberOfDays;
        if (updatedLeaveCount < 0) {
          return res.status(200).json({
            error: "Insufficient leave balance",
          });
        }
      }
      
      totalLeave[leaveType] = updatedLeaveCount;
      const leaveTracker = new LeaveTracker({
        username,
        leaveType,
        appliedTo,
        subject,
        fromDate: startDate,
        toDate: endDate,
        contactNo: parseInt(contactNo),
        altContactNo: parseInt(altContactNo),
        reason,
      });

      if (req.file) {
        leaveTracker.image = req.file.originalname;
      }

      leaveTracker.save().then((result) => {
        const notification = new Notification({
          username: result.username,
          isNotificationStatus: false,
        });
        notification.notificationContent=`You have a new leave notification from ${result.username}`
        notification.save().then(() => {
          res.status(200).json({ result });
        });
      });
      // Send email
      console.log("183",leaveTracker)
      const emailContent = `
          <p>${username},</p>
          <p>Subject: ${subject}</p>
          <p>${reason}<p>
          <p>Please click on the below link to review and approve/disapprove the leave:</p>
          <a href="http://13.126.212.31/">Click here to approve</a>
        `;
        appliedTo.forEach((recipient) => {
          const msg = {
            to: recipient,
            from: "himanshu.975677@gmail.com",
            subject: `${leaveTracker.subject}`,
            html: emailContent,
          };
          sgMail.send(msg);
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
      leaveTracker.status = "Approved";
      return leaveTracker.save();
    })
    .then((leaveTracker) => {
       TotalLeave.findOne({ username: leaveTracker.username }).then(
        (totalLeave) => {
          if (!totalLeave) {
            res.status(400).json({
             error: "Total leave count not found for the user."
            })
          }
          const numberOfDays = Math.ceil(
            (leaveTracker.toDate -
              leaveTracker.fromDate +
              24 * 60 * 60 * 1000) /
              (24 * 60 * 60 * 1000)
          );

          if (leaveTracker.leaveType === "compOff") {
            totalLeave[leaveTracker.leaveType] += numberOfDays;
          } else if (leaveTracker.leaveType === "leaveWithoutpay") {
            totalLeave[leaveTracker.leaveType] += numberOfDays;
          } else {
            totalLeave[leaveTracker.leaveType] -= numberOfDays;
          }

          totalLeave.save().then(() => {
            res.status(200).json("Leave request approved successfully.");
          });
          const emailContent = `
          <p>Your leave application has been Approved.</p>
          <p>From: ${leaveTracker.fromDate}</p>
          <p>To: ${leaveTracker.toDate}</p>
          `;
          const msg = {
            to: `${leaveTracker.username}`,
            from: "himanshu.975677@gmail.com",
            subject: `${leaveTracker.subject}`,
            html: emailContent,
          };
        }
      );
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred approving the leave request.");
    });
};

exports.disapprove = (req, res, next) => {
  const leaveTrackerId = req.query.id;
  LeaveTracker.findById(leaveTrackerId)
    .then((leaveTracker) => {
      if (!leaveTracker) {
        return res.status(404).json({
          error: "Leave tracker not found.",
        });
      }

      // Check if leave tracker is already disapproved
      if (leaveTracker.status === "Disapproved") {
        return res.status(200).json({
          error: "Leave is already disapproved.",
        });
      }
      // Update leave tracker status to disapproved
      leaveTracker.status = "Disapproved";
      leaveTracker.save().then((result) => {
        res.status(200).json({
          message: "Leave disapprove Successfully",
        });
      });

      // Send email
      const emailContent = `
          <p>Your leave application has been disapproved.</p>
          <p>From: ${leaveTracker.fromDate}</p>
          <p>To: ${leaveTracker.toDate}</p>
          `;
      const msg = {
        to: `${leaveTracker.username}`,
        from: "himanshu.975677@gmail.com",
        subject: `${leaveTracker.subject}`,
        html: emailContent,
      };
      sgMail.sendMultiple(msg);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong while disapproving the leave.",
      });
    });
};

exports.getAllLeaveTracker = (req, res, next) => {
  LeaveTracker.find()
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(208).json({
          error: "Data not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.getAllLeaveTrackerNotification = (req, res, next) => {
  LeaveTracker.find()
    .then((response) => {
      if (response) {
        const formattedResponse = response.map((item) => ({
          ...item._doc,
          fromDate: new Date(item.fromDate).toISOString().split("T")[0],
          toDate: new Date(item.toDate).toISOString().split("T")[0],
        }));
        res.status(200).json(formattedResponse);
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