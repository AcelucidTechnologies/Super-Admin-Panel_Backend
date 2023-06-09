const Department= require("../models/department");

exports.createDepartment= (req,res,next)=>{
    let data = new Department({
        username: req.body.username,
        department: req.body.department
    })

    Department.findOne({department: data.department,username: data.username}).then((response)=>{
        if(!response){
            data.save().then((result)=>{
                res.status(200).json(result)
            })
        }else{
            res.status(208).json({
                error: "Department name is already exits"
            })
        }
    }).catch((res)=>{
        res.status(500).json({
            error: "Something went wrong"
        })
    })
}

exports.getDepartment=(req,res,next)=>{
    let { username } = req.query;
    Department.find({ username: username })
      .then((response) => {
        if (response) {
          res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [
            { error: "Something went wrong" },
          ],
        });
        console.log(err);
      });
}