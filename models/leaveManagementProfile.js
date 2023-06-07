const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveProfileSchema = new Schema({
  employeeId: { type: String, unique: true },
  employeeFullName: { type: String },
  FirstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  department: [
    {
      name: { type: String },
      department: { type: String },
    },
  ],
  role: { type: String },
  designation: [
    {
      name: { type: String },
      designation: { type: String },
    },
  ],
  employmentType: [
    {
      name: { type: String },
      employmentType: { type: String },
    },
  ],

  location: [
    {
      name: { type: String },
      location: { type: String },
    },
  ],

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
      State: { type: String },
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
});
