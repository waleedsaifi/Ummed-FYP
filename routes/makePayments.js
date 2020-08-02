const router = require('express').Router();
const mongoose = require('mongoose');
const e = require('express');
const MakePayments = mongoose.model("MakePayment");
const PsychologistsBookSlots = mongoose.model("PsychologistsBookSlots");

router.post("/checkSlots/:psychologistId", async (req, res, next) => {

     PsychologistsBookSlots.find({
        sessionDate: req.body.sessionDate,
        psychologistId: req.params.psychologistId,
    }).exec(function (err, docs) {

        if (docs.length) {
            res.send(docs[0].sessionTiming)
        }
        else{
            res.send("All slots available")
        }

        // if (docs.length) {
        //     PsychologistsBookSlots.find({
        //         sessionDate: sessionDate,
        //         sessionTiming: timeslot,
        //         psychologistId: psychologistId,
        //     }).exec(function (err, docs) {
        //         if (docs.length) {
        //             res.send(docs[0].sessionTiming)
        //         }
        //     })

        // }
    })
})


router.post("/:psychologistId", async (req, res, next) => {

    const {sessionDate, sessionTiming, paymentMethod, accountTitle, accountNo, serviceType, amount, paymentDate, paymentTime, paymentScreenShotProof, patientId } = req.body;
    const psychologistId =req.params.psychologistId;
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

router.put("/pending/:paymentId", async (req, res) => {
    var id = req.params.paymentId;
    const updatestatus = await MakePayments.findOneAndUpdate({
        _id: id
    },
        { paymentStatus: "approved" },
        {
            new: true,
            // runValidators: true
        })
    res.send({ "Payment has been approved": updatestatus });
})

router.delete("/pending/:paymentId", async (req, res) => {
    const deletePaymnet = await MakePayments.findByIdAndRemove({
        _id: req.params.paymentId
    });
    res.send({ "Payment rejected": deletePaymnet });
})

module.exports = router;