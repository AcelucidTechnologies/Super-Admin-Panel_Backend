
const PageSetUpData = require("../models/pageSetUpData");

exports.getpageSetUpData=(req,res,next)=>{
    let { username }= req.query
    PageSetUpData.find({username: username}).then((response)=>{
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

exports.createPageSetUpData = (req, res, next) => {
  let Data = new PageSetUpData({
    username: req.body.username,
    pageTitle: req.body.pageTitle,
    pageLink: req.body.pageLink,
  });
  PageSetUpData.findOne({ pageTitle: Data.pageTitle, username: Data.username })
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


exports.getAllPageSetUpData=()=>{
    PageSetUpData.find().then((response)=>{
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