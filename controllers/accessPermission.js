const Permission =require("../models/modulePermission");
const User = require("../models/user");

exports.getAllUserPermission=(req,res,next)=>{
  let superAdminUsername
  User.find({ role: 'superAdmin' }).then((resp) => {
    superAdminUsername = resp[0].username
    console.log(resp)
    Permission.find({ username: { $ne: superAdminUsername } }).then((response) => {
      res.status(200).send(response);
    }).catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
      console.log(err);
    });
  })
}

exports.getUserPermission=(req,res,next)=>{
    if (req.query.user) { username = req.query.user }
  else { return next() }
    // (req.query.user)?username = req.query.user:next()
    // console.log(username)
    Permission.find({username:username}).then((response)=>{
        res.status(200).send(response);
    }).catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong" }],
        });
        console.log(err);
      });
}
exports.createUserPermission=(req,res,next)=>{
    let Data = req.body.Data;
    console.log(req.body.Data)
    User.findOneAndUpdate({username:Data.username},{modulePermission:true},{ new: true }).then(()=>{
      Permission.insertMany(Data, { new: true })
      .then((response2) => {
        if (response2) {
         res.status(200).send(response2);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong" }],
        });
        console.log(err);
      });
    }) .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong while updating user detail " }],
      });
      console.log(err);
    });
    
}
exports.updateUserPermission=(req,res,next)=>{
    if (req.query.user) { username = req.query.user }
    else { return next() }
    let Data = req.body.Data;
    Permission.findOneAndUpdate({username:username},Data, { new: true })
    .then((response2) => {
      if (response2) {
        res.status(200).send(response2);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
      console.log(err);
    });
}
exports.deleteUserPermission = (req, res, next) => {
    if (req.query.user) { username = req.query.user }
    else { return next() }
    User.findOneAndUpdate({username:username},{modulePermission:false},{ new: true }).then(()=>{
      Permission.findOneAndDelete({username:username})
      .then((response) => {
        if (response) {
              res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong" }],
        });
        console.log(err);
      });
    }) .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong while updating user detail " }],
      });
      console.log(err);
    });
    
  }