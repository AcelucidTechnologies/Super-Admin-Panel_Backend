const UserTypeList = require("../models/usertypeList");


exports.getUserTypeList=(req,res,next)=>{
    let { username } = req.query;
    UserTypeList.find({username: username}).sort({ _id: -1 }).then((response)=>{
        if(response[0]){
            res.status(200).json(response)
        }else{
            res.status(404).json({
                error: "Data not found"
            })
        }
    }).catch((err)=>{
        res.status(500).json({
            error: `Something went wrong`
        })
    })
  }
  
  exports.createUserTypeList = (req, res, next) => {
    let data = new UserTypeList({
      username: req.body.username,
      userType: req.body.userType,
      status: req.body.status,
    });
    UserTypeList.findOne({ userType: req.body.userType,
      username: data.username }).then(
      (response) => {
        if (!response) {
          data.save().then((result) => {
            res.status(200).json(result);
          });
        }
        else{
          res.status(208).json({
            error: "Data already exits"
          })
        }
      }
    ).catch((err)=>{
      res.status(500).json({
        error: "Something went wrong"
      })
    })
  };
  
  exports.updateUserTypeList = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    let Data = req.body;
    UserTypeList
      .findByIdAndUpdate(Id, Data, { new: true })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while updating User Type List" }],
        });
      });
  };
  
  exports.deleteUserTypeList = (req, res, next) => {
    let Id;
    if (req.query.id) {
      Id = req.query.id;
    } else {
      return next();
    }
    UserTypeList.findByIdAndDelete(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong while user Type List" },
          ],
        });
        console.log(err);
      });
  };
  
  exports.getUserTypeListById = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
    UserTypeList.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while fetching a User Type List detail" }],
        });
        console.log(err);
      });
  };