const mongoose = require("mongoose");

const meetingDetails_schema = mongoose.Schema({
    patientId:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    psychologistId:{ type: mongoose.Schema.Types.ObjectId, ref:'Signup'},
    paymentId:{ type: mongoose.Schema.Types.ObjectId, ref:'MakePayment'},
    meetingDetails: {type: String}
})
module.exports = mongoose.model("MeetingDetails", meetingDetails_schema);