const router = require('express').Router();
const mongoose = require('mongoose');
const MakePayments = mongoose.model("MakePayment");

router.post("/:psychologistId", async (req, res, next) => {
    const payment = new MakePayments();
    payment._id = mongoose.Types.ObjectId();
    payment.psychologistId = req.params.psychologistId;
    payment.paymentMethod = req.body.paymentMethod;
    payment.accountTitle = req.body.accountTitle;
    payment.accountNo = req.body.accountNo;
    payment.serviceType = req.body.serviceType;
    payment.amount = req.body.amount;
    payment.paymentDate = req.body.paymentDate;
    payment.paymentTime = req.body.paymentTime;
    payment.sessionDate = req.body.sessionDate;
    payment.sessionTiming = req.body.sessionTiming;
    payment.paymentScreenShotProof = req.body.paymentScreenShotProof;
    payment.paymentStatus = "pending"



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
        });
})

router.get("/approved", async (req, res) => {
    MakePayments.find({ paymentStatus: "approved" })
        .populate('psychologistId', 'name personImage')
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