const mongoose = require("mongoose");

const reportProfile_schema = mongoose.Schema({
    patientId:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    reportAgainst:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    reportText:String,
    reportProof:String,
    previousComplaintsCount: {type:Number, default: 1} 
})
module.exports = mongoose.model("ReportProfile", reportProfile_schema);