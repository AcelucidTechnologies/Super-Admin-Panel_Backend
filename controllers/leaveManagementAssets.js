const LeaveAssets = require("../models/leaveManagementAssets");

exports.createLeaveAssets = (req, res, next) => {
  let data = new LeaveAssets({
    username: req.body.username,
    employeeName: req.body.employeeName,
    typeOfAssets: req.body.typeOfAssets,
    addedBy: req.body.addedBy,
    givenDate: req.body.givenDate,
    returnDate: req.body.returnDate,
    assetsDetails: req.body.assetsDetails,
  });
        data.save().then((result) => {
          if (result) {
            res.status(200).json(result);
          }
        }).catch((err) => {
            res.status(500).json({
              error: "Something went Wrong",
            });
          });
      }
    

      exports.getLeaveAssets=(req,res,next)=>{
        let { username } = req.query;
        LeaveAssets.find({ username: username })
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



    exports.deleteLeaveAssets = (req, res, next) => {
        let Id;
        if (req.query.id) {
          Id = req.query.id;
        } else {
          return next();
        }
        LeaveAssets.findByIdAndDelete(Id)
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
      
      
      
      exports.getLeaveAssetsById = (req, res, next) => {
        let Id;
        if (req.query.id) {
          Id = req.query.id;
        } else {
          return next();
        }
        LeaveAssets.findById(Id)
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

      exports.updateLeaveAssets = (req, res, next) => {
        let Id;
        if (req.query.id) {
          Id = req.query.id;
        } else {
          return next();
        }
        let Data = req.body;
        console.log(Data,"Data")
        LeaveAssets.findByIdAndUpdate(Id, Data, { new: true })
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