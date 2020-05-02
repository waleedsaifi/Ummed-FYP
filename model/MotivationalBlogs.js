const mongoose = require("mongoose");

const motivationalBlog_schema = mongoose.Schema({

    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },
    title: String,
    content: String,
    status: String
})
module.exports = mongoose.model("MotivationalBlogs", motivationalBlog_schema);