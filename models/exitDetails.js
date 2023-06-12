const mongoose= require("mongoose");

const Schema= mongoose.Schema;

const ExitDetailsSchema = new Schema({
    emoloyeeID: {type: String},
    employeeName: {type: String},
    interviewerType: {type: String},
    reasonForLeaving: {type: String},
    workingOrganization: {type: String},
    mostTheCompany: {type: String},
    improveStaffWelfare: {type: String},
    anythingShare: {type: String},
    allAssets: {type: String},
    noticePeriod: {type: String},
    resignation: {type: String},
    manager: {type: String}
}) 