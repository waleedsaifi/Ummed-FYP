const router = require('express').Router();
const mongoose = require('mongoose');

const CreateSession = mongoose.model("CreateSessions");


router.get("/:patientId", async (req, res) => {
    console.log(req.params.patientId);
    const getPsychologistList = await CreateSession.find({ patientId: req.params.patientId });
    res.send(getPsychologistList)
})

module.exports = router;