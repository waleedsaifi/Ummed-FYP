const mongoose = require("mongoose");

const complaints_schema = mongoose.Schema({
    submittedBy:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    complaint:String 
})
module.exports = mongoose.model("Complaints", complaints_schema);