const router = require('express').Router();
const mongoose = require('mongoose');
const SuccessStory = mongoose.model("successStory");


router.post("/:patientId", async (req, res, next) => {

    // SuccessStory.find({ submittedBy: req.params.patientId })
    //     .exec(function (err, doc) {
    //         if (doc.length) {
    //             return res.send("You already added Success Story");
    //         }
    //     })
    
    const story = new SuccessStory();
    story._id = mongoose.Types.ObjectId();
    story.patientId = req.params.patientId;
    story.successStory = req.body.successStory;
    story.successStoryDate = req.body.successStoryDate;
    story.successStoryTiming = req.body.successStoryTiming;
    story.save()
        .then(result => {
            res.status(201).json(
                { "Thankyou for your story ": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.get("/getPendingSuccessStory", async (req, res) => {

    SuccessStory.find({ status: "pending" })
        // .populate('patientId', 'name , personImage')
        // .populate('feedbackAgainst', 'name')
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


router.put("/approvePendingSuccessStory/:storyId", async (req, res) => {
    var id = req.params.storyId;
    const updatestatus = await SuccessStory.findOneAndUpdate(
        {_id: id},
        { status: "approved" },
        {new: true}
        )
    res.send({ "Patient Success Story has been approved ": updatestatus });
})

router.delete("/deleteSuccessStory/:storyId", async (req, res) => {
    const deleteSuccessStory = await SuccessStory.findByIdAndRemove({
        _id: req.params.storyId
    });
    res.send({ "Success Story has been deleted": deleteSuccessStory });
})

router.get("/getApprovedSuccessStory", async (req, res) => {

    SuccessStory.find({ status: "approved" })
        .populate('patientId', 'name , personImage')
        // .populate('feedbackAgainst', 'name')
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