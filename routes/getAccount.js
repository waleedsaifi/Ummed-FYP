const router = require('express').Router();
const mongoose = require('mongoose');
const Signup = mongoose.model("Signup");



router.get("/Psychologists", async (req, res) => {
    const person = await Signup.find({ userRole: "Psychologist", accountStatus: "approved" });
    res.send(person)
})


router.get("/Patients", async (req, res) => {
    const person = await Signup.find({ userRole: "Patient" });
    res.send(person)
})

router.get("/Speakers", async (req, res) => {
    const person = await Signup.find({ userRole: "MotivationalSpeaker", accountStatus: "approved" });
    res.send(person)
})

router.get("/Writers", async (req, res) => {
    const person = await Signup.find({ userRole: "ContentWriter", accountStatus: "approved" });
    res.send(person)
})

router.get("/Instructors", async (req, res) => {
    const person = await Signup.find({ userRole: "GymInstructor", accountStatus: "approved" });
    res.send(person)
})

module.exports = router;