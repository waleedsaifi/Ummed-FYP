const mongoose = require("mongoose");

const complaints_schema = mongoose.Schema({
    submittedBy:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    submittedAgainst:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    complaintText:String,
    complaintProof:String,
    previousComplaintsCount: {type:Number, default: 1} 
})
module.exports = mongoose.model("Complaints", complaints_schema);