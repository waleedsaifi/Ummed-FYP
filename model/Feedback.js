const mongoose = require("mongoose");

const feedback_schema = mongoose.Schema({
    psychologistId:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    patientId: { type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    feedback: String,
    rating: Number,
    feedbackDate:String,
    feedbackTiming:String 
})
module.exports = mongoose.model("Feedback", feedback_schema);