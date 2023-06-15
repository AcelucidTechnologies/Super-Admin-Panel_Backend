const LeaveTracker = require("../models/leaveTracker");
const TotalLeave= require("../models/totalLeaves")
const multer = require("multer");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const sgMail = require('@sendgrid/mail');
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
    cb(null, `leaveTracker/${file.originalname}`)
  },
  });

 const uploadData =
    multer({
      storage: s3Storage,
    });
exports.uploadLeave = uploadData.single("image")

// exports.createLeaveTracker = async (req, res, next) => {
//     try {
//       const { username, leaveType, appliedTo, fromDate, toDate, contactNo, altContactNo, reason } = req.body;
  
//       const startDate = new Date(fromDate);
//       const endDate = new Date(toDate);
  
//       if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//         return res.status(400).json({
//           error: "Invalid date format. Please provide valid 'fromDate' and 'toDate' values.",
//         });
//       }
  
//       const oneDay = 24 * 60 * 60 * 1000;
//       const numberOfDays = Math.ceil((endDate - startDate) / oneDay); // Add oneDay to include the last day
  
//       if (numberOfDays <= 0) {
//         return res.status(400).json({
//           error: "Invalid date range. 'toDate' should be greater than or equal to 'fromDate'.",
//         });
//       }
  
//       const totalLeave = await TotalLeave.findOneAndUpdate(
//         { username },
//         {},
//         { upsert: true, new: true }
//       );
  
//       if (!totalLeave) {
//         return res.status(400).json({
//           error: "Total leave count not found for the user.",
//         });
//       }
  
//       const availableLeave = totalLeave[leaveType];
  
//       if (availableLeave < numberOfDays) {
//         return res.status(400).json({
//           error: "Insufficient leave Balance.",
//         });
//       }
  
//       const leaveTracker = new LeaveTracker({
//         username,
//         leaveType,
//         appliedTo,
//         fromDate: startDate,
//         toDate: endDate,
//         contactNo: parseInt(contactNo),
//         altContactNo: parseInt(altContactNo),
//         reason,
//         image: req.file.originalname,
//       });

  
//       totalLeave[leaveType] -= numberOfDays;
//       await Promise.all([leaveTracker.save(), totalLeave.save()]);
  
//       res.status(200).json({ leaveTracker, totalLeave });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({
//         error: "Something went wrong while saving the leave tracker.",
//       });
//     }
//   };
  
    

  // exports.createLeaveTracker = async (req, res, next) => {
  //   try {
  //     const { username, leaveType, appliedTo, fromDate, toDate, contactNo, altContactNo, reason } = req.body;
  
  //     const startDate = new Date(fromDate);
  //     const endDate = new Date(toDate);
  
  //     if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
  //       return res.status(400).json({
  //         error: "Invalid date format. Please provide valid 'fromDate' and 'toDate' values.",
  //       });
  //     }
  
  //     const oneDay = 24 * 60 * 60 * 1000;
  //     const numberOfDays = Math.ceil((endDate - startDate + oneDay) / oneDay); // Add oneDay to include the last day
  
  //     if (numberOfDays <= 0) {
  //       return res.status(400).json({
  //         error: "Invalid date range. 'toDate' should be greater than or equal to 'fromDate'.",
  //       });
  //     }
  
  //     const totalLeave = await TotalLeave.findOneAndUpdate(
  //       { username },
  //       {},
  //       { upsert: true, new: true }
  //     );
  
  //     if (!totalLeave) {
  //       return res.status(400).json({
  //         error: "Total leave count not found for the user.",
  //       });
  //     }
  
  //     const leaveTracker = new LeaveTracker({
  //       username,
  //       leaveType,
  //       appliedTo,
  //       fromDate: startDate,
  //       toDate: endDate,
  //       contactNo: parseInt(contactNo),
  //       altContactNo: parseInt(altContactNo),
  //       reason,
  //       image: req.file.originalname,
  //     });
  
  //     totalLeave[leaveType] -= numberOfDays;
  
  //     await Promise.all([leaveTracker.save(), totalLeave.save()]);
  
  //     res.status(200).json({ leaveTracker, totalLeave });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({
  //       error: "Something went wrong while saving the leave tracker.",
  //     });
  //   }
  // };
  
  
  
  
  exports.getLeaveTracker=(req,res,next)=>{
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
            { error: "Something went wrong while fetching Leave Tracker details" },
          ],
        });
        console.log(err);
      });
}

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
        console.log(err);
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
        }
        else{
            res.json({
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
        console.log(err);
      });
  };

  exports.createLeaveTracker = async (req, res, next) => {
    try {
      const { username, leaveType, appliedTo, fromDate, toDate, contactNo, altContactNo, reason } = req.body;
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
  
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
          error: "Invalid date format. Please provide valid 'fromDate' and 'toDate' values.",
        });
      }
  
      const oneDay = 24 * 60 * 60 * 1000;
      const numberOfDays = Math.ceil((endDate - startDate + oneDay) / oneDay); // Add oneDay to include the last day
  
      if (numberOfDays <= 0) {
        return res.status(400).json({
          error: "Invalid date range. 'toDate' should be greater than or equal to 'fromDate'.",
        });
      }
  
      const totalLeave = await TotalLeave.findOneAndUpdate(
        { username },
        {},
        { upsert: true, new: true }
      );
  
      if (!totalLeave) {
        return res.status(400).json({
          error: "Total leave count not found for the user.",
        });
      }
  
      const leaveTracker = new LeaveTracker({
        username,
        leaveType,
        appliedTo,
        fromDate: startDate,
        toDate: endDate,
        contactNo: parseInt(contactNo),
        altContactNo: parseInt(altContactNo),
        reason,
        image: req.file.originalname,
        status: 'Pending'
      });
  
      await Promise.all([leaveTracker.save(), totalLeave.save()]);
  
      // Send email notification with SendGrid
      const emailContent = `
        <p>Dear ${username},</p>
        <p>Your leave request is pending approval. Please click the button below to approve or disapprove:</p>
        <a href="http://localhost:4200">please click on this link</a>
      `;
      
      const msg = {
        to: 'himanshu.aswal@acelucid.com',
        from: 'shivam.rawat@acelucid.com',
        subject: 'LeaveTracker Approval',
        html: emailContent,
      };
  
      const sendGridResponse = await sgMail.send(msg);
      console.log(sendGridResponse);
  
      res.status(200).json({ leaveTracker, totalLeave });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Something went wrong while saving the leave tracker.",
      });
    }
  };

  exports.approved = async (req, res, next) => {
    try {
      const leaveTracker = await LeaveTracker.findOneAndUpdate(
        { uniqueIdentifier: req.query.id },
        { status: 'Approved' },
        { new: true }
      );
  
      let totalLeave = await TotalLeave.findOne({ username: leaveTracker.username });
      totalLeave[leaveTracker.leaveType] -= leaveTracker.numberOfDays;
      totalLeave = await totalLeave.save();
  
      res.status(200).send('Leave request approved successfully.');
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while approving the leave request.');
    }
  };

  exports.disapprove=(req,res,next)=>{
      const leaveTracker =LeaveTracker.findOneAndUpdate(
        { uniqueIdentifier: req.query.username },
        { status: 'Disapproved' },
        { new: true }
      );
      res.status(200).send('Leave request disapproved successfully.');
  };