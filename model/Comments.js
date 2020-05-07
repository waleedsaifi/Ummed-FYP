const mongoose = require("mongoose");

const comments_schema = mongoose.Schema({
    givenBy:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    onPost:{ type: mongoose.Schema.Types.ObjectId, ref:'MotivationalBlogs'},
    commentText:String 
})
module.exports = mongoose.model("Comments", comments_schema);