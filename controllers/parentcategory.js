const ParentCategory = require("../models/parentCategory");
exports.getAllParentCategory = (req, res, next) => {
  console.log("get all parent category ")
  ParentCategory.find()
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
};

exports.getParentCategoryById = (req, res, next) => {
  let  Id
 (req.query.id)?Id = req.query.id:next()
  ParentCategory.findById(Id)
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
};

exports.updateParentCategory = (req, res, next) => {
  let { Id , Data} = req.body;
  console.log(Data)
  ParentCategory.findByIdAndUpdate(Id, Data, { new: true })
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
};

exports.deleteParentCategory = (req, res, next) => {
  let  Id
 (req.query.id)?Id = req.query.id:next()
  ParentCategory.findByIdAndDelete(Id)
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
};
