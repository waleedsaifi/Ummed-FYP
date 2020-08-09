const router = require('express').Router();
const mongoose = require('mongoose');
const e = require('express');
// const MeetingDetails = require('../model/MeetingDetails');
const MakePayments = mongoose.model("MakePayment");
const PsychologistsBookSlots = mongoose.model("PsychologistsBookSlots");
const CreateSession = mongoose.model("CreateSessions");
const SystemAccount = mongoose.model("SystemAccount");
const MeetingDetails = mongoose.model("MeetingDetails");

router.post("/checkslots/:psychologistId", async (req, res, next) => {

    const day = req.body.day;
    PsychologistsBookSlots.find({
        sessionDate: req.body.sessionDate,
        psychologistId: req.params.psychologistId,
    }).exec(function (err, docs) {

        if (docs.length) {
            console.log(day, "day")
            res.send({ Day: day, alreadyBookedSlots: docs[0].sessionTiming })
        }
        else {
            res.send({ Day: day, alreadyBookedSlots: "All slots available" })
        }
    })
})


router.post("/:psychologistId", async (req, res, next) => {

    const { sessionDate, sessionTiming, paymentMethod, accountTitle, accountNo, serviceType, amount, paymentDate, paymentTime, paymentScreenShotProof, patientId } = req.body;
    const psychologistId = req.params.psychologistId;
    const timeslot = sessionTiming.slice(0, 2);
    console.log(timeslot, 'time slot');
    const BookSlotNewDay = new PsychologistsBookSlots();
    BookSlotNewDay.psychologistId = psychologistId
    BookSlotNewDay.sessionDate = sessionDate
    BookSlotNewDay.sessionTiming.push(timeslot)

    const payment = new MakePayments();
    payment._id = mongoose.Types.ObjectId();
    payment.psychologistId = psychologistId;
    payment.paymentMethod = paymentMethod;
    payment.accountTitle = accountTitle;
    payment.accountNo = accountNo;
    payment.serviceType = serviceType;
    payment.amount = amount;
    payment.paymentDate = paymentDate;
    payment.paymentTime = paymentTime;
    payment.sessionDate = sessionDate;
    payment.sessionTiming = sessionTiming;
    payment.paymentScreenShotProof = paymentScreenShotProof;
    payment.patientId = patientId;

    if (serviceType == "Video Chat") {
        console.log(serviceType);

        const searchDay = PsychologistsBookSlots.find({
            sessionDate: sessionDate,
            psychologistId: psychologistId,
        }).exec(function (err, docs) {
            if (docs.length) {
                PsychologistsBookSlots.find({
                    sessionDate: sessionDate,
                    sessionTiming: timeslot,
                    psychologistId: psychologistId,
                }).exec(function (err, docs) {
                    if (docs.length) {
                        res.send(docs[0].sessionTiming)
                    }
                    else {
                        PsychologistsBookSlots.findOneAndUpdate(
                            {
                                sessionDate: sessionDate,
                                psychologistId: psychologistId,
                            },
                            { $push: { sessionTiming: timeslot } },
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
                    }
                })
            }
            else {
                BookSlotNewDay.save()
                payment.save()
                    .then(result => {
                        res.status(201).json(
                            { "Payment will be verified by administration": result });
                    })
            }
        })
    } else {
        console.log(serviceType);
        BookSlotNewDay.save()
        payment.save()
            .then(result => {
                res.status(201).json(
                    { "Payment will be verified by administration": result });
            })
    }
})


router.get("/approved", async (req, res) => {
    MakePayments.find({ paymentStatus: "approved" })
        .populate('psychologistId', 'name personImage')
        .populate('patientId', 'name personImage')
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

router.get("/pending", async (req, res) => {
    MakePayments.find({ paymentStatus: "pending" })
        .populate('psychologistId', 'name personImage')
        .populate('patientId', 'name personImage')
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

// router.get("/getPsychologistPendingPayments/:psychologistId", async (req, res) => {
//     MakePayments.find({ paymentStatus: "pending" , psychologistId:req.params.psychologistId})
//         .populate('psychologistId', 'name personImage')
//         .populate('patientId', 'name personImage')
//         .exec()
//         .then(docs => {
//             res.status(200).json(docs)
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

router.put("/pending/:paymentId", async (req, res) => {
    var id = req.params.paymentId;
    const updatestatus = await MakePayments.findOneAndUpdate({
        _id: id
    },
        { paymentStatus: "approved" },
        { new: true, })


        console.log(updatestatus);

        // const SystemAccount = new SystemAccount();
        // const updatSystemAccount = await SystemAccount.findOneAndUpdate({
        // },
        //     { systemAccountBalance: updatestatus.amount })

        //     console.log(updatSystemAccount, "SA");



        // const meetingDetails = new MeetingDetails();
        // meetingDetails._id = mongoose.Types.ObjectId();
        // meetingDetails.psychologistId = updatestatus.psychologistId;
        // meetingDetails.patientId = updatestatus.patientId;
        // meetingDetails.paymentId = updatestatus._id;
        // meetingDetails.meetingDetails= req.body.meetingDetails;
        // meetingDetails.save();
        // console.log(meetingDetails, "Details For Meeting");

    const createSession = new CreateSession();
    createSession._id = mongoose.Types.ObjectId();
    createSession.psychologistId = updatestatus.psychologistId;
    createSession.patientId = updatestatus.patientId;
    createSession.paymentId = updatestatus._id;
    createSession.meetingDetails= req.body.meetingDetails;
    createSession.save()
        // .populate('psychologistId', 'name personImage')
        // .populate('paymentId', 'sessionDate sessionTiming ')
        // .exec()
        .then(result => {
            res.status(201).json(
                { "Session has been created": result});
        })
})

router.delete("/pending/:paymentId", async (req, res) => {
    const deletePaymnet = await MakePayments.findByIdAndRemove({
        _id: req.params.paymentId
    });
    res.send({ "Payment rejected": deletePaymnet });
})

module.exports = router;