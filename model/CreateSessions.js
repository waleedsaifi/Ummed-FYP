const mongoose = require("mongoose");

const sessions_schema = mongoose.Schema({
    patientId:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    psychologistId:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    paymentId:{ type: mongoose.Schema.Types.ObjectId, ref:'MakePayment'},
})
module.exports = mongoose.model("CreateSessions", sessions_schema);