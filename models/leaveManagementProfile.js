const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveProfileSchema = new Schema(
  {
    username: { type: String },
    employeeId: {
      type: String,
      default: () => generateEmployeeId(),
    },
    employeeFullName: { type: String },
    FirstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    department: { type: String },
    role: { type: String },
    designation: { type: String },
    employmentType: { type: String },
    location: { type: String },
    employeeStatus: { type: String },
    sourceHiring: { type: String },
    dateOfJoining: { type: String },
    currentExp: { type: String },
    totalExp: { type: String },
    reportingManager: { type: String },
    personalDetails: {
      dateOfBirth: { type: String },
      expertise: { type: String },
      age: { type: Number },
      gender: { type: String },
      maritalStatus: { type: String },
      aboutMe: { type: String },
    },
    identityInformation: {
      uan: { type: Number },
      panNumber: { type: String },
      aadharNumber: { type: Number },
    },
    contactDetails: {
      workingPhoneNumber: { type: Number },
      personalMobileNumber: { type: Number },
      personalEmailAddress: { type: String },
      presentAddress: {
        address1: { type: String },
        address2: { type: String },
        country: { type: String },
        state: { type: String },
        city: { type: String },
        pincode: { type: String },
      },
      permanentAddress: {
        address1: { type: String },
        address2: { type: String },
        country: { type: String },
        State: { type: String },
        city: { type: String },
        pincode: { type: String },
      },
    },
    separationOfDate: { type: String },
    systemFields: {
      addedBy: { type: String },
      addedTime: { type: String },
      modifiedBy: { type: String },
      modifiedTime: { type: String },
      onBoardingStatus: { type: String },
    },
    workExperience: [
      {
        companyName: { type: String },
        jobTitle: { type: String },
        fromDate: { type: String },
        toDate: { type: String },
        jobDescription: { type: String },
        releventExp: { type: String },
      },
    ],
    educationDetails: [
      {
        instituteName: { type: String },
        degree: { type: String },
        specialization: { type: String },
        toDate: { type: String },
        dateOfCompletion: { type: String },
      },
    ],
  },

  {
    timestamps: true,
    collection: "leaveManagementProfile",
  }
);

function generateEmployeeId() {
  const currentYear = new Date().getMilliseconds().toString().substr(-2);
  console.log("new date", currentYear);
  const paddedSequentialNumber = generateSequentialNumber()
    .toString()
    .padStart(4, "0");
  console.log("123", generateSequentialNumber());
  console.log("paddedSequentialNumber", paddedSequentialNumber);
  return `EMP-${currentYear}-${paddedSequentialNumber}`;
}

let sequentialNumber = 0;

function generateSequentialNumber() {
  return ++sequentialNumber;
}
module.exports = mongoose.model("leaveManagementProfile", leaveProfileSchema);
