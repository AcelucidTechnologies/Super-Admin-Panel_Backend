const Sponsor = require("../models/sponsor")

exports.getAllSponsors = (req, res, next)  =>{
    Sponsor.find().then((response) => {
        console.log(response)
      if (response) {
        res.status(200).send(response);
      }
    }).catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong" }],
        });
        console.log(err);
      });
}

exports.getSponsorDetail = (req, res, next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
      Sponsor.findById(Id)
        .then((response) => {
          if (response) {
            res.status(200).send(response);
          }
        }).catch((err) => {
          res.status(500).json({
            errors: [{ error: "Something went wrong" }],
          });
          console.log(err);
        });
    };

    exports.createSponsorDetail = (req, res, next) => {
        let Data = JSON.parse(req.body.Data);
        console.log(Data);
        Sponsor.insertMany(Data, { new: true })
        .then((response2) => {
          if (response2) {
            res.status(200).send(response2);
          }
        })
        .catch((err) => {
          res.status(500).json({
            errors: [{ error: "Something went wrong while creating sponsor details" }],
          });
          console.log(err);
        });
    }

    exports.updateSponsorDetail = (req, res, next) =>{
        let  Id
        if (req.query.id) { Id = req.query.id }
        else { return next() }
        let Data = JSON.parse(req.body.Data);
        // console.log(req.params)
       Sponsor.findByIdAndUpdate(Id, Data, { new: true }).then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      }).catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong while updating sponsor detail" }],
        });
        console.log(err);
      });
    } 

    exports.deleteSponsorDetail = (req, res, next) => {
        let  Id
        if (req.query.id) { Id = req.query.id }
        else { return next() }
        Sponsor.findByIdAndDelete(Id)
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
      }