const router = require('express').Router();
const mongoose = require('mongoose');

const CreateSession = mongoose.model("CreateSessions");
const Signup = mongoose.model("Signup");


router.get("/:psychologistId", async (req, res) => {

    CreateSession.find({ psychologistId: req.params.psychologistId}, '-sessionStatus -_id -psychologistId -paymentId -__v')
    .distinct('patientId')
        .exec()
        .then(docs => {
            Signup.find({ _id: docs })
                .exec()
                .then(doc => {
                    res.status(200).send(doc)
                })
            console.log(docs, 'ids')  
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
    // .populate('psychologistId', 'name personImage')
    .populate('patientId', 'name personImage email')
    // .populate('paymentId', 'sessionDate sessionTiming ')
    // .populate('psychologistId')
    // .populate('patientId')
    .populate('paymentId')
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