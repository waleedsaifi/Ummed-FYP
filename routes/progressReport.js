const router = require('express').Router();
const mongoose = require('mongoose');
const ProgressReport = mongoose.model("ProgressReport");


router.post("/:patientId/:psychologistId", async (req, res, next) => {
    const report = new ProgressReport();
    report._id = mongoose.Types.ObjectId();
    report.submittedBy = req.params.psychologistId;
    report.reportOfPatient = req.params.patientId;
    report.report = req.body.report;
    report.save()
        .then(result => {
            res.status(201).json(
                { "Report Submitted Successfully ": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

 
router.get("/", async (req, res) => {
    ProgressReport.find()
        .populate('submittedBy', 'name')
        .populate('reportOfPatient', 'name')
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