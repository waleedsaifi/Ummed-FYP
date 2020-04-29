const mongoose = require("mongoose");

const progressReport_schema = mongoose.Schema({
    submittedBy:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    reportOfPatient: { type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    report:String 
})
module.exports = mongoose.model("ProgressReport", progressReport_schema);