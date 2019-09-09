const mongoose = require("mongoose");

const signup_schema = mongoose.Schema({
    cnic:String,
    age:Number,
    name:String,
    email:String,
    password:String,
    gender:Number,
    contact:String,
    // address:String,
    imageurl:String,
    joiningDate :{type: Date, default: Date.now("<YYYY-mm-ddTHH:MM:ssZ>") }


})

module.exports = mongoose.model("Signup", signup_schema);