const router = require('express').Router();
const mongoose = require('mongoose');
const Complaints = mongoose.model("Complaints");

router.post("/:psychologistId", async (req, res, next) => {

    
    Complaints.countDocuments({submittedAgainst: req.params.psychologistId},
         function(err, c) {
        console.log('Count is ' + c);
        const complaint = new Complaints();
        complaint._id = mongoose.Types.ObjectId();
       
        complaint.submittedAgainst = req.params.psychologistId;   
        complaint.submittedBy = req.body.patientId;
        complaint.complaintText = req.body.complaintText;
        complaint.complaintProof = req.body.complaintProof;

        complaint.previousComplaintsCount= c;  
        complaint.save()
            .then(result => {
                res.status(201).json(
                    { "Complaint Registered Successfully ": result });
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
        .populate('submittedBy', 'name')
        .populate('submittedAgainst', 'name')
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