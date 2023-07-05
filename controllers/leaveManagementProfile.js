const LeaveManagementProfile = require("../models/leaveManagementProfile");

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
    cb(null, `profile/${file.originalname}`);
  },
});

const uploadData = multer({
  storage: s3Storage,
});
exports.uploadProfile = uploadData.single("image");

exports.createLeaveManagementProfile = (req, res, next) => {
  let data = new LeaveManagementProfile({
    username: req.body.username,
    employeeFullName: req.body.employeeFullName,
    FirstName: req.body.FirstName,
    lastName: req.body.lastName,
    email: req.body.email,
    department: req.body.department,
    role: req.body.role,
    designation: req.body.designation,
    employmentType: req.body.employmentType,
    location: req.body.location,
    employeeStatus: req.body.employeeStatus,
    sourceHiring: req.body.sourceHiring,
    dateOfJoining: req.body.dateOfJoining,
    currentExp: req.body.currentExp,
    totalExp: req.body.totalExp,
    reportingManager: req.body.reportingManager,
    workExperience: req.body.workExperience,
    educationDetails: req.body.educationDetails,
    personalDetails: req.body.personalDetails,
    identityInformation: req.body.identityInformation,
    contactDetails: req.body.contactDetails,
    separationOfDate: req.body.separationOfDate,
    systemFields: req.body.systemFields,
  });
  if (req.file) {
    data.image = req.file.originalname;
  }
  LeaveManagementProfile.findOne({
    email: req.body.email,
    username: req.body.username,
  })
    .then((response) => {
      if (!response) {
        data.save().then((result) => {
          if (result) {
            res.status(200).json(result);
          }
        });
      } else {
        res.status(208).json({
          error: "Email Already Exit",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went Wrong",
      });
    });
};

exports.getLeaveProfile = (req, res, next) => {
  let { username } = req.query;
  LeaveManagementProfile.find({ username: username })
    .then((response) => {
      response.map((item) => {
        if (item.image)
          item.image = process.env.bucket_path + "profile/" + item.image;
      });

      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(208).json({
        error: "Data not found"
      });
    });
};

exports.deleteLeaveProfile = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  LeaveManagementProfile.findByIdAndDelete(Id)
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

exports.getLeaveProfileById = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  LeaveManagementProfile.findById(Id)
    .then((response) => {
      if (response) {
        response.image
          ? (response.image =
              process.env.bucket_path + "profile/" + response.image)
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

exports.updateLeaveProfile = (req, res, next) => {
  let Id;
  req.query.id ? (Id = req.query.id) : next();
  let data = {
    employeeFullName: req.body.employeeFullName,
    FirstName: req.body.FirstName,
    lastName: req.body.lastName,
    email: req.body.email,
    department: req.body.department,
    role: req.body.role,
    designation: req.body.designation,
    employmentType: req.body.employmentType,
    location: req.body.location,
    employeeStatus: req.body.employeeStatus,
    sourceHiring: req.body.sourceHiring,
    dateOfJoining: req.body.dateOfJoining,
    currentExp: req.body.currentExp,
    totalExp: req.body.totalExp,
    reportingManager: req.body.reportingManager,
    workExperience: req.body.workExperience,
    educationDetails: req.body.educationDetails,
    personalDetails: req.body.personalDetails,
    identityInformation: req.body.identityInformation,
    contactDetails: req.body.contactDetails,
    separationOfDate: req.body.separationOfDate,
    systemFields: req.body.systemFields,
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
      LeaveManagementProfile.findByIdAndUpdate(Id, data, { new: true })
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

exports.getTeamData = (req, res, next) => {
  let { username } = req.query;
  LeaveManagementProfile.find({ username: username })
    .select({ department: 1,_id: 0 })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getEmail = (req, res, next) => {
  let { username } = req.query;
  LeaveManagementProfile.find({ username: username })
    .select({ email: 1, employeeFullName: 1})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
