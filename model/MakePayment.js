const mongoose = require("mongoose");

const payment_schema = mongoose.Schema({
    psychologistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },
    paymentMethod: String,
    accountTitle: String,
    accountNo: String,
    serviceType: String,
    amount: Number,
    paymentDate: String,
    paymentTime: String,
    sessionDate: String,
    sessionTiming: String,
    paymentScreenShotProof: String,
    paymentStatus: String
})
module.exports = mongoose.model("MakePayment", payment_schema);