const mongoose = require("mongoose");

const signup_schema = mongoose.Schema({

    cnic:String,
    age:Number,
    name:String,
    email:  {type: String, required: true },
    password:String,
    gender:Number,
    contact:String,
    userRole:String,
    // address:String,
    // personImage:String,
    // joiningDate :{type: Date, default: Date.now }


})

module.exports = mongoose.model("Signup", signup_schema);