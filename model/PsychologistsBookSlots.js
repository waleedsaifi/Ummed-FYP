const mongoose = require("mongoose");

const PsychologistsBookSlots_schema = mongoose.Schema({
    psychologistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },
    sessionDate: String,
    sessionTiming : [String]
 
})
module.exports = mongoose.model("PsychologistsBookSlots", PsychologistsBookSlots_schema);