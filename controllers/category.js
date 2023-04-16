const Category = require("../models/category");
const bucket = require("../mediacontrol");
exports.getAllCategory = (req, res, next) => {
  Category.find()
    .then((response) => {
      if (response) {
        response.map((item) => {
          item.image = process.env.bucket_path + item.image;
        });
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
      console.log(err);
    });
};

exports.getCategoryById = (req, res, next) => {
  let  Id
 (req.query.id)?Id = req.query.id:next()
  Category.findById(Id)
    .then((response) => {
      if (response) {
        response.image = process.env.bucket_path + response.image;
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
      console.log(err);
    });
};

exports.updateCategory = (req, res, next) => {
  let  Id
  (req.query.id)?Id = req.query.id:next()
  let Data = JSON.parse(req.body.Data);
  let check = new Promise((resolve, reject) => {
    if (Object.keys(Data).includes("image")) {
        Data.image = req.file.originalname;
        resolve(true);
    } else {
      resolve(true);
    }
  });
  check.then((result) => {
    if (result) {
      console.log(req.body.Id);
      Category.findByIdAndUpdate(Id, Data, { new: true })
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
  });
};

exports.deleteCategory = (req, res, next) => {
  let  Id
  (req.query.id)?Id = req.query.id:next()
  Category.findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
        bucket.imageDelete(response.image).then((returned)=>{
         
         console.log(returned)
         if (returned) res.status(200).send(response);
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
      console.log(err);
    });
};
