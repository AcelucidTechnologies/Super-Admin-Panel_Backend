const ExitDetails= require("../models/exitDetails");

exports.createExitDetails=(req,res,next)=>{
let data= new ExitDetails({
    emoloyeeId: req.body.emoloyeeId,
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
    manager: req.body.manager
})
  ExitDetails.findOne({emoloyeeId: req.body.emoloyeeId,username: req.body.username}).then((response) => {
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
                error: "Emoloyee ID Already Exit"
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