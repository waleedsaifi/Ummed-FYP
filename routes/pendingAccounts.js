const router = require('express').Router();
const mongoose = require('mongoose');
const Signup = mongoose.model("Signup");

router.get("/Psychologists", async (req, res) => {
    const person = await Signup.find({ userRole: "Psychologist", accountStatus: "pending" });
    res.send(person)
})

router.get("/Patients", async (req, res) => {
    const person = await Signup.find({ userRole: "Patient" });
    res.send(person)
})

router.get("/Speakers", async (req, res) => {
    const person = await Signup.find({ userRole: "MotivationalSpeaker", accountStatus: "pending" });
    res.send(person)
})

router.get("/Writers", async (req, res) => {
    const person = await Signup.find({ userRole: "ContentWriter", accountStatus: "pending" });
    res.send(person)
})

router.get("/Instructors", async (req, res) => {
    const person = await Signup.find({ userRole: "GymInstructor", accountStatus: "pending" });
    res.send(person)
})


router.put("/:accountId", async (req, res) => {
    var id = req.params.accountId;
    const updatestatus = await Signup.findOneAndUpdate({
        _id: id
    },
        { accountStatus: "approved" },
        {
            new: true,
            // runValidators: true
        })
    res.send({ "Account Status Updated Successfully": updatestatus });
})

router.delete("/:accountId", async (req, res) => {
    const deleteAccount = await Signup.findByIdAndRemove({
        _id: req.params.accountId
    });
    res.send({ "Account has been Removed ": deleteAccount });
})

module.exports = router;