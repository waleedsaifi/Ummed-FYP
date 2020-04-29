const router = require('express').Router();
const mongoose = require('mongoose');
const Feedback = mongoose.model("Feedback");


router.post("/:patientId/:psychologistId", async (req, res, next) => {
    console.log("hello From Feedabck")
    const feedback = new Feedback();
    feedback._id = mongoose.Types.ObjectId();
    feedback.submittedBy = req.params.patientId;
    feedback.feedbackAgainst = req.params.psychologistId;
    feedback.complaint = req.body.feedback;
    feedback.save()
        .then(result => {
            res.status(201).json(
                { "Feedback Registered Successfully ": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

 
router.get("/", async (req, res) => {
    Feedback.find()
        .populate('submittedBy', 'name')
        .populate('feedbackAgainst', 'name')
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

// router.get("/:signupId", async (req, res) => {
//     const person = await Signup.findOne({ _id: req.params.signupId })
//     res.send(person);
// })

// router.delete("/:signupId", async (req, res) => {
//     const person = await Signup.findByIdAndRemove({
//         _id: req.params.signupId
//     });
//     res.send(person);
// })


module.exports = router;