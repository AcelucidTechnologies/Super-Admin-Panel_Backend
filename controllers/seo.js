const Seo= require("../models/seo");

exports.createSeo=(req,res,next)=>{
let data= req.body;
console.log("seo",data);
let Data= new Seo({
    username: req.body.username,
    selectPage: req.body.selectPage,
    metaTitle: req.body.metaTitle,
    metaDescription: req.body.metaDescription,
    metaKeyword: req.body.metaDescription
})

Data.save().then((response)=>{
res.status(200).json(response)
}).catch((err)=>{
    res.status(500).json({
        error: "Something went wrong"
    })
})
}

exports.getSeo=(req,res,next)=>{
let {username}= req.query;

Seo.find({username: username}).then((response)=>{
   if(response){
    res.status(200).json(response)
   }
   else{
    res.status(4040).json({
        error: "Data not found"
    })
   }
}).catch((err)=>{
res.status(500).json({
    error: "Internal server error"
})
})
}