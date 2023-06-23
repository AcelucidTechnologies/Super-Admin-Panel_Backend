
const PageSetUp = require("../models/pageSetUp");
const pageSetUp = require("../models/pageSetUp");

exports.getpageSetUp=(req,res,next)=>{
    let { username }= req.query
    pageSetUp.find({username: username}).then((response)=>{
        if(response[0]){
            res.status(200).json(response)
        }else{
            res.status(404).json({
                error: "Data not found"
            })
        }
    }).catch((err)=>{
        res.status(500).json({
            error: `Something went wrong ${err}`
        })
    })
}

exports.createPageSetUp = (req, res, next) => {
  let Data = new PageSetUp({
    username: req.body.username,
    pageTitle: req.body.pageTitle,
    pageLink: req.body.pageLink,
    pageContent: req.body.pageContent,
  });
  PageSetUp.findOne({ pageTitle: Data.pageTitle, username: Data.username })
    .then((response) => {
      if (!response) {
        Data.save().then((result) => {
          res.status(200).json(result);
        });
      } else {
        res.status(208).json({
          error: "Page Title already exit",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.updatePageSetUp = (req, res, next) => {
  let Id;
  if (req.query.id) {
    Id = req.query.id;
  } else {
    return next();
  }
  let Data = req.body;
  pageSetUp
    .findByIdAndUpdate(Id, Data, { new: true })
    .then((response) => {
      if (response) {
        res.status(200).send(response);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong while updating Page Set Up" }],
      });
    });
};

exports.getAllPageSetUp=()=>{
    pageSetUp.find().then((response)=>{
      if(response){
        res.status(200).json(response)
      }
      else{
        res.status(404).json({
          error: "Data not Found"
        })
      }
    }).catch((err)=>{
      res.status(500).json({
        error: "Something went wrong"
      })
    })
  }

  exports.getPageSetUpDataById = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
     PageSetUp.findById(Id)
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while fetching a Page set detail" }],
        });
        console.log(err);
      });
  };