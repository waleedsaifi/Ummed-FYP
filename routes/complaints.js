const router = require('express').Router();
const mongoose = require('mongoose');
const Complaints = mongoose.model("Complaints");


router.post("/:patientId", async (req, res, next) => {

    const complaint = new Complaints();
    complaint._id = mongoose.Types.ObjectId();
    complaint.submittedBy = req.params.patientId;
    complaint.complaint = req.body.complaint;
    complaint.save()
        .then(result => {
            res.status(201).json(
                { "Complaint Registered Successfully ": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

 
router.get("/", async (req, res) => {
    Complaints.find()
        .populate('submittedBy', 'name')
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

// router.put("/:signupId", async (req, res) => {
//     const person = await Signup.findOneAndUpdate({
//         _id: req.params.signupId
//     },
//         req.body,
//         {
//             new: true,
//             runValidators: true
//         })
//     res.send(person);
// })

// router.delete("/:signupId", async (req, res) => {
//     const person = await Signup.findByIdAndRemove({
//         _id: req.params.signupId
//     });
//     res.send(person);
// })


module.exports = router;