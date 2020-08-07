const router = require('express').Router();
const mongoose = require('mongoose');
const Feedback = mongoose.model("Feedback");
const psychologistRatings = mongoose.model("Ratings");


router.post("/:psychologistId", async (req, res, next) => {
    const feedback = new Feedback();
    feedback._id = mongoose.Types.ObjectId();
    feedback.psychologistId = req.params.psychologistId;
    feedback.patientId = req.body.patientId;
    feedback.rating = req.body.rating;
    feedback.feedback = req.body.feedback;
    feedback.feedbackDate = req.body.feedbackDate;
    feedback.feedbackTiming = req.body.feedbackTiming;
    feedback.save()
        .then(result => {
            res.status(200).json(
                { "Feedback Registered Successfully ": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})


router.get("/:psychologistId", async (req, res) => {
    Feedback.find({ psychologistId: req.params.psychologistId })
        .populate('patientId', 'name email')
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

router.post("/giveRatings/:psychologistId", async (req, res) => {
    psychologistRatings.findOneAndUpdate(
        {
            psychologistId: req.params.psychologistId,
        },
        { $push: { ratingsArray: timeslot } },
        { new: true, })
        .exec()
    payment.save()
        .then(result => {
            res.status(201).json(
                { "Payment will be verified by administration": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})




module.exports = router;