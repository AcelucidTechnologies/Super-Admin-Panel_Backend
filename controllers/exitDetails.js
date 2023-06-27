const ExitDetails= require("../models/exitDetails");

exports.createExitDetails=(req,res,next)=>{
let data= new ExitDetails({
    username: req.body.username,
    employeeId: req.body.employeeId,
    employeeName: req.body.employeeName,
    interviewerType: req.body.interviewerType,
    reasonForLeaving: req.body.reasonForLeaving,
    workingOrganization: req.body.workingOrganization,
    mostTheCompany: req.body.mostTheCompany,
    improveStaffWelfare: req.body.improveStaffWelfare,
    anythingShare: req.body.anythingShare,
    allAssets: req.body.allAssets,
    noticePeriod: req.body.noticePeriod,
    resignation: req.body.resignation,
    manager: req.body.manager,
    separationDate: req.body.separationDate,
    workWithOrganisationAgain: req.body.workWithOrganisationAgain,
    resignationLetterSubmitted: req.body.resignationLetterSubmitted,
    addedBy: req.body.addedBy,
    modifiedBy: req.body.modifiedBy
})
  ExitDetails.findOne({employeeId: data.employeeId,username: data.username}).then((response) => {
        if (!response) {
          data.save().then((result) => {
            res.json(result);
          });
        }
        else
        {
            res.status(208).json({
                error: "Emoloyee ID Already Exits"
            })
        }
      }).catch((err)=>{
        res.status(500).json({
            error: "Something went Wrong"
        })
      })
}

exports.getExitDetails=(req,res,next)=>{
    let { username } = req.query;
    ExitDetails.find({ username: username })
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
        console.log(err);
      });
}

exports.deleteExitDetails = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    ExitDetails.findByIdAndDelete(Id)
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

  exports.getExitDetailsById = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    ExitDetails.findById(Id)
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

  exports.updateExitDetails = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    let Data = req.body;
    ExitDetails
      .findByIdAndUpdate(Id, Data, { new: true })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while updating Exit Details" }],
        });
      });
  };