const router = require('express').Router();
const mongoose = require('mongoose');

const CreateSession = mongoose.model("CreateSessions");


router.get("/:patientId", async (req, res) => {


    CreateSession.find({ patientId: req.params.patientId})
    // select('_id')
    .select('psychologistId')
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

    // console.log(req.params.patientId);
    // const getPsychologistList = await CreateSession.find({ patientId: req.params.patientId });
    // res.send(getPsychologistList)
})

module.exports = router;