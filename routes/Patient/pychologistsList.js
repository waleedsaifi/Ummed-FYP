const router = require('express').Router();
const mongoose = require('mongoose');

const CreateSession = mongoose.model("CreateSessions");


router.get("/:patientId", async (req, res) => {
    CreateSession.find({ patientId: req.params.patientId})
    .populate('psychologistId')
    // .populate('patientId')
    // .populate('paymentId')
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
    .populate('psychologistId', 'name personImage email')
    // .populate('patientId', 'name personImage')
    .populate('paymentId')
    // .populate('psychologistId')
    // .populate('patientId')
    // .populate('paymentId')
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