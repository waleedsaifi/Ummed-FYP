const mongoose = require("mongoose");

const rating_schema = mongoose.Schema({
    psychologistId:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    ratingsArray: [Number],
    averageRatings:{type : Number, default: 0} 
})
module.exports = mongoose.model("Ratings", rating_schema);