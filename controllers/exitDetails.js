const ExitDetails= require("../models/exitDetails");

exports.createExitDetails=(req,res,next)=>{
let data= new ExitDetails({
    emoloyeeID: req.body.employeeId,
    employeeName: req.body.employeeName,
    interviewerType: req.body.interviewerType,
    reasonForLeaving: req.body.reasonForLeaving,
    workingOrganization: req.body.workingOrganization,
    mostTheCompany: req.body.mostTheCompany,
    improveStaffWelfare: req.body.improveStaffWelfare,
    anythingShare: req.body.anythingShare,
    allAssets: req.body.allAssets,
    noticePeriod: {type: String},
    resignation: {type: String},
    manager: {type: String}
})
}