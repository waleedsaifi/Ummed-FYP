const mongoose = require("mongoose");

const successStory_schema = mongoose.Schema({
    // psychologistId:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    patientId: { type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    successStory: String,
    successStoryDate:String,
    successStoryTiming:String,
    status:{type:String, default:"pending"} 
}) 
module.exports = mongoose.model("successStory", successStory_schema);