const Reimbursement = require("../models/travelExpense");

exports.createReimbursement = (req, res, next) => {
  const journeyDate = new Date(req.body.journeyDate);
  const returnDate = new Date(req.body.returnDate);

  if (journeyDate > returnDate) {
    return res.status(200).json({ error: "invalid value for journey date" });
  }

  let data = new Reimbursement({
    username: req.body.username,
    employeeId: req.body.employeeId,
    employeeName: req.body.employeeName,
    journeyDate: journeyDate,
    returnDate: returnDate,
    travelFrom: req.body.travelFrom,
    travelTo: req.body.travelTo,
    purposeTravel: req.body.purposeTravel,
    modifiedBy: req.body.modifiedBy,
    addedBy: req.body.addedBy
  });
  data
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};


exports.getReimbursement=(req,res,next)=>{
    let { username } = req.query;
    Reimbursement.find({ username: username })
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
      });
  };

  exports.updateReimbursement = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    let Data = req.body;
    Reimbursement.findByIdAndUpdate(Id, Data, { new: true })
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