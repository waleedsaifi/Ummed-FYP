const router = require('express').Router();
const mongoose = require('mongoose');
const ReportProfile = mongoose.model("ReportProfile");

router.post("/:reportAgainst", async (req, res, next) => {

    
    Complaints.countDocuments({submittedAgainst: req.params.psychologistId},
         function(err, c) {
        console.log('Count is ' + c);
        const complaint = new Complaints(); 
        complaint._id = mongoose.Types.ObjectId();
       
        complaint.reportAgainst = req.params.reportAgainst;
        complaint.patientId = req.body.patientId;   
        complaint.reportText = req.body.reportText;
        complaint.reportProof = req.body.reportProof;
        complaint.previousComplaintsCount= c;  
        
        complaint.save()
            .then(result => {
                res.status(201).json(
                    { "Report Registered Successfully ": result });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });     
   });
   console.log(previousComplaints, "Previous")
})

router.get("/", async (req, res) => {
    Complaints.find({ previousComplaintsCount: { $gte: 3 } } )
        .populate('patientId', 'name')
        .populate('reportAgainst', 'name')
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