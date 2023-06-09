
const LeaveManagementProfile = require("../models/leaveManagementProfile");

exports.createLeaveManagementProfile = (req, res, next) => {
  let data = new LeaveManagementProfile({
    username: req.body.username,
    employeeFullName: req.body.employeeFullName,
    FirstName: req.body.FirstName,
    lastName: req.body.lastName,
    email: req.body.email,
    department: req.body.department,
    role: req.body.role,
    designation: req.body.department,
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
    identityInformation: req.body.contactDetails,
    contactDetails: req.body.contactDetails,
    separationOfDate: req.body.separationOfDate,
    systemFields: req.body.systemFields,
  })
  LeaveManagementProfile.findOne({email: req.body.email,username: req.body.username}).then((response) => {
        if (!response) {
            data.save().then((result)=>{
                if(result){
                    res.status(200).json(result)
                }
            })
        }
        else
        {
            res.status(208).json({
                error: "Email Already Exit"
            })
        }
      }).catch((err)=>{
        res.status(500).json({
            error: "Something went Wrong"
        })
      })
};

exports.getLeaveProfile=(req,res,next)=>{
    let { username } = req.query;
    LeaveManagementProfile.find({ username: username })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong while fetching profile details" },
          ],
        });
        console.log(err);
      });
}

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

  exports.updateLeaveProfile = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    let Data = req.body;
    console.log(Data,"Data")
    LeaveManagementProfile.findByIdAndUpdate(Id, Data, { new: true })
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
            { error: `Something went wrong ${err}` },
          ],
        });
      });
  };