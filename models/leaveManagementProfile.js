const mongoose= require("mongoose")
const Schema= mongoose.Schema;

const leaveProfileSchema= new Schema({
    employeeId: {type: String, unique: true},
    employeeFullName: {type: String},
    FirstName: {type: String},
    lastName: {type: String},
    email: {type: String,unique: true},
    department: {type: Array},
    role: {type: String},
    designation: {type: Array},
    location: {type: Array},
    employmentType : {type: Array},
    location: {type: Array},
    employeeStatus: {type: String},
    sourceHiring: {type: String},
    dateOfJoining: {type: String},
    currentExp: {type: String},
    totalExp: {type: String},
    reportingManager: {type: String},
    personalDetails: {
        dateOfBirth: {type: String},
        expertise: {type: String},
        age: {type: Number},
        gender: {type: String},
        maritalStatus: {type: String},
        aboutMe: {type: String},
        
    }
})