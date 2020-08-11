const router = require('express').Router();
const mongoose = require('mongoose');

const CreateSession = mongoose.model("CreateSessions");
const Signup = mongoose.model("Signup");




router.get("/:patientId", async (req, res) => {
    const sessionData=  await CreateSession.find({ patientId: req.params.patientId }, '-sessionStatus -_id -patientId -paymentId -__v').distinct('psychologistId')
    const findPsychologists = await  Signup.find({ _id: sessionData })

    return res.send(findPsychologists);
})

router.get("/activeSession/:patientId", async (req, res) => {
    CreateSession.find({ patientId: req.params.patientId, sessionStatus: "Active" })
        .populate('psychologistId', 'name personImage email')
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