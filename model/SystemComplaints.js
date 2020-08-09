const mongoose = require("mongoose");

const SystemComplaint_schema = mongoose.Schema({
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },
    complaintText: String,
    systemComplaintDate: String,
    systemComplaintTiming: String
})
module.exports = mongoose.model("SystemComplaints",SystemComplaint_schema);