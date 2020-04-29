const mongoose = require("mongoose");

const feedback_schema = mongoose.Schema({
    submittedBy:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    feedbackAgainst: { type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    feedback:String 
})
module.exports = mongoose.model("Feedback", feedback_schema);