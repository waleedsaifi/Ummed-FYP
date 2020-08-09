const mongoose = require("mongoose");

const healthExercise_schema = mongoose.Schema({

    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },
    title: String,
    content: String,
    status: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Signup' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Signup' }],
    comments: [{ comment: String, postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' } }]
})
module.exports = mongoose.model("HealthExercises", healthExercise_schema);