const mongoose = require("mongoose");

const successStory_schema = mongoose.Schema({
    submittedBy:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    // feedbackAgainst: { type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    story:String ,
    status: String
})
module.exports = mongoose.model("successStory", successStory_schema);