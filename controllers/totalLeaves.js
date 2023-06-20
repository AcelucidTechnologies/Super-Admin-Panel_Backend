const TotalLeaves= require("../models/totalLeaves");

exports.getTotalLeaves=(req,res,next)=>{
    let { username } = req.query;
    TotalLeaves.find({ username: username })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong while fetching Total Leaves details" },
          ],
        });
      });
}