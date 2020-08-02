const router = require('express').Router();
const mongoose = require('mongoose');
const SuccessStory = mongoose.model("successStory");


router.post("/:patientId", async (req, res, next) => {

    SuccessStory.find({submittedBy : req.params.patientId})
    .exec(function(err,doc){
        if(doc.length) {
            return res.send("You already added Success Story");
        }
    })

    console.log(req.params.patientId);
    const story = new SuccessStory();
    story._id = mongoose.Types.ObjectId();
    story.submittedBy = req.params.patientId;
    story.story = req.body.story;
    story.status= "pending"
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

 
router.get("/getSuccessStory", async (req, res) => {

    SuccessStory.find()
        .populate('submittedBy', 'name')
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