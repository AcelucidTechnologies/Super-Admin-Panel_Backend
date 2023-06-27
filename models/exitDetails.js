const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ExitDetailsSchema = new Schema(
  {
    username: { type: String },
    employeeId: { type: String },
    employeeName: { type: String },
    interviewerType: { type: String },
    reasonForLeaving: { type: String },
    workingOrganization: { type: String },
    mostTheCompany: { type: String },
    improveStaffWelfare: { type: String },
    anythingShare: { type: String },
    allAssets: { type: String },
    noticePeriod: { type: String },
    resignation: { type: String },
    manager: { type: String },
    separationDate: { type: Date },
    workWithOrganisationAgain: { type: String },
    resignationLetterSubmitted: { type: String },
    addedBy: { type: String },
    modifiedBy: { type: String },
  },
  {
    timestamps: true,
    collection: "ExitDetail",
  }
);

module.exports = mongoose.model("ExitDetail", ExitDetailsSchema);
