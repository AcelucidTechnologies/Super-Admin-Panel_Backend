const Product = require("../models/product");
const bucket = require("../mediacontrol");

exports.getAllProduct = (req, res, next) => {
  Product.find()
    .then((response) => {
      if (response) {
        response.map((item) => {
          item.images = process.env.bucket_path + item.images;
          item.videos = process.env.bucket_path + item.videos;
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

exports.getProduct = (req, res, next) => {
  let  Id
 (req.query.id)?Id = req.query.id:next()
  Product.findById(Id)
    .then((response) => {
      if (response) {
        response.images = process.env.bucket_path + response.images;
        response.videos = process.env.bucket_path + response.videos;
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

exports.createProduct = (req, res, next) => {
  let Data = JSON.parse(req.body.Data);
  let resultdata = "";
  let resultvideodata = "";
  let check = new Promise((resolve, reject) => {
        bucket.videoUpload(req.files.video[0]).then((ret) => {
          resultvideodata = ret;
          if (!!resultvideodata) {
            // console.log([resultdata, resultvideodata]);
            Data.images = req.files.image[0].originalname;
            Data.videos = req.files.video[0].originalname;
          }
          resolve(true);
        });
  });
  check.then((result) => {
    if (result) {
      console.log(result);
      Product.insertMany(Data, { new: true })
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


exports.updateProduct = (req, res, next) => {
  let  Id
  (req.query.id)?Id = req.query.id:next()
  let Data = JSON.parse(req.body.Data);
  let resultdata = "";
  let resultvideodata = "";
  console.log(Data);
  let check = new Promise((resolve, reject) => {
    if (
      Object.keys(Data).includes("videos") &&
      Object.keys(Data).includes("images")
    ) {
        bucket.videoUpload(req.files.video[0]).then((ret) => {
          resultvideodata = ret;
          if (!!resultvideodata) {
            // console.log([resultdata, resultvideodata]);
            Data.images = req.files.image[0].originalname;
            Data.videos = req.files.video[0].originalname;
          }
          resolve(true);
        });
    }
    else if(Object.keys(Data).includes("images"))
    {
        Data.images = req.files.image[0].originalname;
        resolve(true);
    }
    else if(Object.keys(Data).includes("videos"))
    {
      bucket.videoUpload(req.files.video[0]).then(()=> {
        Data.videos =  req.files.video[0].originalname;
        resolve(true);
      })
    }
    else {
      resolve(true);
    }
  });
  check.then((result) => {
    if (result) {
      Product.findByIdAndUpdate(Id, Data, { new: true })
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
    
  

exports.deleteProduct = (req, res, next) => {
  // bucket.listfiles();
  let resultdata, resultvideodata;
  let  Id
 (req.query.id)?Id = req.query.id:next()
  Product.findByIdAndDelete(Id)
    .then((response) => {
      if (response) {
      bucket.imageDelete(response.images).then((returned)=>{
        resultdata=returned
        bucket.videoDelete(response.videos).then((ret)=>{
          resultvideodata =ret
          res.status(200).send(response);
          if(resultdata==true && resultvideodata==true)
         { bucket.listfiles();}
        });
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
