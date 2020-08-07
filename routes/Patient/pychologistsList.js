const router = require('express').Router();
const mongoose = require('mongoose');

const CreateSession = mongoose.model("CreateSessions");
const PsychologistRatings = mongoose.model("Ratings");
const Signup = mongoose.model("Signup");




router.get("/:patientId", async (req, res) => {
    const sessionData=  await CreateSession.find({ patientId: req.params.patientId }, '-sessionStatus -_id -patientId -paymentId -__v').distinct('psychologistId')
    const findPsychologists = await  Signup.find({ _id: sessionData })
    // const psychologistRatings = await PsychologistRatings.find({psychologistId: sessionData}, 'averageRatings psychologistId -_id')
    // res.send({findPsychologists:findPsychologists,psychologistRatings:psychologistRatings })
    return res.send(findPsychologists);
})
// router.get("/:patientId", async (req, res) => {
//     CreateSession.find({ patientId: req.params.patientId }, '-sessionStatus -_id -patientId -paymentId -__v')
//         .distinct('psychologistId')
//         .exec()
//         .then(docs => {
//             const findPsychologists =  Signup.find({ _id: docs })
//             // Signup.find({ _id: docs })
//             const psychologistRatings = PsychologistRatings.find({psychologistId: docs})
//             res.send({psychologistId:findPsychologists, ratings:psychologistRatings})
//                 // .exec()
//                 // .then(doc => {
//                 //     return res.send(doc)
//                 // })
//             console.log(docs, 'ids')  
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

router.get("/activeSession/:patientId", async (req, res) => {
    CreateSession.find({ patientId: req.params.patientId, sessionStatus: "Active" })
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