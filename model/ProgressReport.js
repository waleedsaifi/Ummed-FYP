const mongoose = require("mongoose");

const progressReport_schema = mongoose.Schema({
    psychologistId:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    patientId: { type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    observedConditionBeforeSession: String,
    observedConditionAfterSession: String,
    suggestions: String,
    conditionImproved:String,
    reportDate:String,
    reportTiming:String 
})
module.exports = mongoose.model("ProgressReport", progressReport_schema);