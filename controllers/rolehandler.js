const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { roles } = require("../roles");

exports.grantAccess = function (action, resource) {
  return (req, res, next) => {
    if (req.headers["x-access-token"]) {
      const token = req.headers["x-access-token"];
      const { userId, exp } = jwt.verify(token, process.env.TOKEN);
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }
      let user;
      User.findById(userId).then((data) => {
        user = data;
        console.log(user)
        if (!user)
          return res.status(401).json({
            error: "You need to be logged in to access this route",
          });
        else {
          req.user = data;
          // console.log("==>", user);
          console.log(user.role);
          const permission = roles.can(user.role)[action](resource);
          if (!permission.granted) {
            return res.status(401).json({
              error: "You don't have enough permission to perform this action",
            });
          } else {
            next();
          }
        }
      });
    } else {
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
      next();
    }
  };
};

