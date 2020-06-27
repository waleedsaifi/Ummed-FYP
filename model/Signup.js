const mongoose = require("mongoose");


const signup_schema = mongoose.Schema({
    cnic: String,
    age: Number,
    name: String,
    email: { type: String, required: true },
    password: String,
    gender: Number,
    contact: String,
    userRole: String,
    personImage: String,
    accountStatus: String,

    //Gym Instructor 
    workExperience: String,

    //Links
    portfolioLink: String,
    twitterLink: String,
    facebookLink: String,
    linkedInLink: String,
    instagramLink: String,

    //PsychplogistFields
    areaOfSpeciality: String,
    weekdaysTimingFrom: String,
    weekdaysTimingTill: String,
    weekendTimingFrom: String,
    weekendTimingTill: String,

    currentWorkPlace: String,
    currentWorkPlacePosition: String,
    currentlyWorkingFrom: String,
    currentJobDescription: String,

    workPlace1: String,
    workPlace1Position: String,
    workPlace1Duration: String,
    workedFrom1: String,
    workedTill1: String,
    workDescription1: String,

    institute1Name: String,
    session1From: String,
    session1Till: String,
    degree1Title: String,
    degree1: String,

    institute2Name: String,
    session2From: String,
    session2Till: String,
    degree2Title: String,
    degree2: String,

    institute3Name: String,
    session3From: String,
    session3Till: String,
    degree3Title: String,
    degree3: String
})
module.exports = mongoose.model("Signup", signup_schema);