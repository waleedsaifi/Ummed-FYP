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



// router.put("/unblockAccount/:accountId", async (req, res) => {
//     var id = req.params.accountId;
//     const updatestatus = await Signup.findOneAndUpdate({
//         _id: id
//     },
//         { accountStatus: "approved" },
//         {
//             new: true,
//         })
//     res.send({ "Account has been blocked": updatestatus });
// })

// router.get("/blockedAccounts", async (req, res) => {
//     const person = await Signup.find({ accountStatus: "blocked" });
//     res.send(person)
// })


module.exports = router;