const mongoose = require("mongoose");

const motivationalBlog_schema = mongoose.Schema({

    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },
    title: String,
    content: String,
    status: String,
    likes: {type: Number, default: 0},
    dislike:{type: Number, default: 0},
    // comments:{type: [String] , default: null} 
})
module.exports = mongoose.model("MotivationalBlogs", motivationalBlog_schema);