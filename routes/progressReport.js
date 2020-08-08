const router = require('express').Router();
const mongoose = require('mongoose');
const ProgressReport = mongoose.model("ProgressReport");


router.post("/:patientId", async (req, res, next) => {
    const report = new ProgressReport();
    report._id = mongoose.Types.ObjectId();
    report.psychologistId = req.body.PsychologistId;
    report.patientId = req.params.patientId;
    report.observedConditionBeforeSession = req.body.observedConditionBeforeSession;
    report.observedConditionAfterSession = req.body.observedConditionAfterSession;
    report.suggestions = req.body.suggestions;
    report.reportDate = req.body.reportDate;
    report.conditionImproved= req.body.conditionImproved;
    report.reportTiming = req.body.reportTiming;
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

router.get("/:patientId", async (req, res) => {
    ProgressReport.find({ patientId: req.params.patientId })
        .populate('psychologistId', 'name personImage')
        // .populate('reportOfPatient', 'name')
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