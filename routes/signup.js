const router = require('express').Router();
const mongoose = require('mongoose');
const Signup = mongoose.model("Signup");
const multer = require('multer');
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {

    const person = await Signup.findOne({
        email: req.body.email
    });
    if (person) return res.status(400).send("This Email Address already registered");

    const info = new Signup();
    info._id = mongoose.Types.ObjectId();
    info.cnic = req.body.cnic;
    info.age = req.body.age;
    info.name = req.body.name;
    info.email = req.body.email;
    info.password = req.body.password;
    info.personImage = req.body.personImage;
    info.gender = req.body.gender;
    info.contact = req.body.contact;
    info.userRole = req.body.userRole;
    info.accountStatus = req.body.accountStatus
    // console.log(info.password);

    info.workExperience = req.body.workExperience;

    info.portfolioLink = req.body.portfolioLink;
    info.twitterLink = req.body.twitterLink;
    info.facebookLink = req.body.facebookLink;
    info.linkedInLink = req.body.linkedInLink;
    info.instagramLink = req.body.instagramLink;


    //PsychplogistFields
    info.areaOfSpeciality = req.body.areaOfSpeciality
    info.weekdaysTimingFrom = req.body.weekdaysTimingFrom
    info.weekdaysTimingTill = req.body.weekdaysTimingTill
    info.weekendTimingFrom = req.body.weekendTimingFrom
    info.weekendTimingTill = req.body.weekendTimingTill

    info.currentWorkPlace = req.body.currentWorkPlace
    info.currentWorkPlacePosition = req.body.currentWorkPlacePosition
    info.currentlyWorkingFrom = req.body.currentlyWorkingFrom
    info.currentJobDescription = req.body.currentJobDescription

    info.workPlace1 = req.body.workPlace1
    info.workPlace1Position = req.body.workPlace1Position
    info.workPlace1Duration = req.body.workPlace1Duration
    info.workedFrom1 = req.body.workedFrom1
    info.workedTill1 = req.body.workedTill1
    info.workDescription1 = req.body.workDescription1

    info.institute1Name = req.body.institute1Name
    info.session1From = req.body.session1From
    info.session1Till = req.body.session1Till
    info.degree1Title = req.body.degree1Title
    info.degree1 = req.body.degree1

    info.institute2Name = req.body.institute2Name
    info.session2From = req.body.session2From
    info.session2Till = req.body.session2Till
    info.degree2Title = req.body.degree2Title
    info.degree2 = req.body.degree2

    info.institute3Name = req.body.institute3Name
    info.session3From = req.body.session3From
    info.session3Till = req.body.session3Till
    info.degree3Title = req.body.degree3Title
    info.degree3 = req.body.degree3



    const hash = await bcrypt.hashSync(info.password, 10);
    info.password = hash;
    info.save()
        .then(result => {
            res.status(201).json(
                { "Account will be approved after Admin's verification ": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    // res.send("Registered Successfully => " + info);

})


router.get("/", async (req, res) => {
    const person = await Signup.find({});
    res.send(person)
})

router.get("/:signupId", async (req, res) => {
    const person = await Signup.findOne({ _id: req.params.signupId })
    res.send(person);
})


router.put("/:signupId", async (req, res) => {
    const person = await Signup.findOneAndUpdate({
        _id: req.params.signupId
    },
        req.body,
        {
            new: true,
            runValidators: true
        })
    res.send(person);
})

router.delete("/:signupId", async (req, res) => {
    const person = await Signup.findByIdAndRemove({
        _id: req.params.signupId
    });
    res.send(person);
})



module.exports = router;