const User = require("../../models/user");
const bcrypt = require("bcrypt");
const emailRegxp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const jwt = require("jsonwebtoken");
const bucket = require("../../mediacontrol");
const Permission = require("../../models/modulePermission")

exports.signup = (req, res, next) => {
  let { email, password, username, phone, role } = req.body;
  let users
  console.log(email, password, username, phone, role)
  console.log(req.file)
  let errors = [];
  if (!email) {
    errors.push("email required");
  }
  if (!emailRegxp.test(email)) {
    errors.push("invalid email");
  }
  if (!password) {
    errors.push("password required");
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: "email already exists" }] });
      }
      else if (req.file) {
          users = new User({
            email: email,
            password: password,
            username: username,
            phone: phone,
            role: role,
            image: req.file.originalname
          });
          const token = jwt.sign(
            { userId: users._id },
            process.env.TOKEN,
            {
              expiresIn: "1d",
            }
          );
          users.token = token;
          // save user token

          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
              if (err) throw err;
              users.password = hash;
              users
                .save()
                .then((response) => {
                  bucket.listfiles();
                  res.status(200).json({
                    success: true,
                    result: response,
                    token,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    errors: [{ error: err }],
                  });
                });
            });
          });
      }
      else {
        users = new User({
          email: email,
          password: password,
          username: username,
          phone: phone,
          role: role
        });
        const token = jwt.sign(
          { userId: users._id },
          process.env.TOKEN,
          {
            expiresIn: "1d",
          }
        );
        users.token = token;
        // save user token

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            users.password = hash;
            users
              .save()
              .then((response) => {
                bucket.listfiles();
                res.status(200).json({
                  success: true,
                  result: response,
                  token,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
      console.log(err);
    });
};

exports.updatesignup = (req, res, next) => {
  // bucket.listfiles();
  // bucket.imageDelete('pexels-beach.jpg').then((returned)=>{
         
  //   console.log(returned)
  //   if (returned) res.status(200).send(returned);
  //  })
  let { username, email, phone, role, prevImgName, password } = req.body;
  let image;
  let newUsername;
  console.log(req.body)
  let Data = {}
  // bucket.listfiles()
  // bucket.imageDelete('sunsetatrussia.jpg')
  // console.log(req.body)
  let check = new Promise((resolve, reject) => {

    if (req.file) {
        image = req.file.originalname;
        Object.assign(Data, { username: username, phone: phone, role: role, image: image })
        // console.log(Data)
        if (prevImgName) {
          bucket.imageDelete(prevImgName).then(() => {
            if (password) {
              bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                  if (err) throw err;
                  Object.assign(Data, { password: hash })
                  // console.log(Data)
                  resolve(true)
                });
              });
            }
            else{resolve(true)}
          });
        }
        else { resolve(true) }
    }
    else {
      Object.assign(Data, { username: username, phone: phone, role: role })
      // console.log(Data)
      if (password) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            Object.assign(Data, { password: hash })
            resolve(true);
            // console.log(Data)
          });
        });
      }
      else {
        resolve(true);
      }
    }
  });
  let usernameCheck = new Promise((resolve, reject) => {
    User.find({ email: email }).then((respRecieved) => {
      oldUsername = respRecieved[0].username
      if (oldUsername != username) {
        if (respRecieved[0].modulePermission) {
          Permission.findOneAndUpdate({ username: oldUsername }, { username: username }, { new: true }).then((response2) => {
            if (response2) {
              // res.status(200).send(response2);
              // console.log(response2)
              Object.assign(Data, { username: username })
              resolve(true)
            }
          })
            .catch((err) => {
              res.status(500).json({
                errors: [{ error: "Something went wrong while checking for username" }],
              });
              console.log(err);
            });
        }
        else {
          resolve(true)
        }
      }
      else {
        resolve(true)
      }
    })
  })

  Promise.all([check, usernameCheck]).then((result) => {
    if (result) {
      console.log(Data);
      User.findOneAndUpdate({ email: email }, Data, { new: true })
        .then((response2) => {
          if (response2) {
            res.status(200).send(response2);
            // console.log(response2)
          }
        })
        .catch((err) => {
          res.status(500).json({
            errors: [{ error: "Something went wrong" }],
          });
          console.log(err);
        });
    }
  });
}

exports.login = (req, res, next) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: "email required" });
  }
  if (!emailRegxp) {
    errors.push({ email: "invalid email" });
  }
  if (!password) {
    errors.push({ password: "password required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ errors: [{ user: "User not found" }] });
      } else {
        console.log("Done");
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (!match) {
              return res
                .status(404)
                .json({ errors: [{ password: "Incorrect Password" }] });
            }
            const token = jwt.sign(
              { userId: user._id },
              process.env.TOKEN,
              {
                expiresIn: "1d",
              }
            );
            user.token = token;
            res.status(200).json(user);
          })
          .catch((err) => {
            res.status(502).json({ errors: err });
            console.log(err);
          });
      }
    })
    .catch((err) => {
      res.status(502).json({ errors: err });
    });
};

exports.logout = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  const payload = {};
  jwt.sign(payload, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      console.log(logout);
      res.send({ msg: "You have been Logged Out" + payload });
    } else {
      res.send({ msg: "Error" });
    }
  });
};

exports.adminLogin = (req, res, next) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: "email required" });
  }
  if (!emailRegxp) {
    errors.push({ email: "invalid email" });
  }
  if (!password) {
    errors.push({ password: "password required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ errors: [{ user: "User not found" }] });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (!match) {
              return res
                .status(404)
                .json({ errors: [{ password: "Incorrect Password" }] });
            } else {
              if (user.role === "admin" || user.role === "superAdmin") {
                const token = jwt.sign(
                  { userId: user._id },
                  process.env.TOKEN,
                  {
                    expiresIn: "1d",
                  }
                );
                user.token = token;
                res
                  .status(200)
                  .json({
                    data: { id: user._id, email: user.email, role: user.role },
                    token,
                  });
              } else {
                res
                  .status(502)
                  .json("You Are Not Allowed to Access this Route");
              }
            }
          })
          .catch((err) => {
            res.status(502).json({ errors: err });
            console.log(err);
          });
      }
    })
    .catch((err) => {
      res.status(502).json({ errors: err });
    });
};

exports.deleteUser = (req, res, next) => {
  let username = req.query.user;
  bucket.listfiles();
  // bucket.imageDelete('sunsetatrussia.jpg').then((returned)=>{
         
  //          console.log(returned)
  //          if (returned){ bucket.listfiles();
  //           res.status(200).send({success:true});}
  //         })
  User.findOneAndDelete({username:username})
    .then((response) => {
      if (response.image) {
        bucket.imageDelete(response.image).then((returned) => {
          console.log(returned)
          if (returned) { bucket.listfiles(); }
        })
      }
      Permission.findOneAndDelete({ username: username })
        .then(() => { res.status(200).send(response) })
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
      console.log(err);
    });
};