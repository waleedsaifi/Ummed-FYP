const router = require('express').Router();
const mongoose = require('mongoose');

const CreateSession = mongoose.model("CreateSessions");


router.get("/:patientId", async (req, res) => {
    CreateSession.find({ patientId: req.params.patientId}, 'psychologistId -_id')
    // select('_id')
    // .select('psychologistId')
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

router.get("/activeSession/:patientId", async (req, res) => {
    CreateSession.find({ patientId: req.params.patientId, sessionStatus: "Active"})
    // select('_id')
    
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