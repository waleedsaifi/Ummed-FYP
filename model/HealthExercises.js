const mongoose = require("mongoose");

const healthExercise_schema = mongoose.Schema({

    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },
    title: String,
    content: String,
    status: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Signup' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Signup' }],
    comments:{type: [String] , default: null} 
})
module.exports = mongoose.model("HealthExercises", healthExercise_schema);