const router = require('express').Router();
const mongoose = require('mongoose');

const CreateSession = mongoose.model("CreateSessions");


router.get("/:psychologistId", async (req, res) => {


    CreateSession.find({ psychologistId: req.params.psychologistId}, 'patientId -_id')
    // select('_id')
    // .select('patientId')
    // .populate('psychologistId', 'name personImage')
    // .populate('paymentId', 'sessionDate sessionTiming ')
    .exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})


router.get("/activeSession/:psychologistId", async (req, res) => {
    CreateSession.find({ psychologistId: req.params.psychologistId, sessionStatus: "Active"})
    .populate('psychologistId', 'name personImage')
    .populate('patientId', 'name personImage')
    .populate('paymentId', 'sessionDate sessionTiming ')
    .exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;