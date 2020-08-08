const router = require('express').Router();
const mongoose = require('mongoose');
const ReportProfile = mongoose.model("ReportProfile");
 
router.post("/:reportAgainst", async (req, res, next) => {

    
    ReportProfile.countDocuments({submittedAgainst: req.params.psychologistId},
         function(err, c) {
        console.log('Count is ' + c);
        const complaint = new ReportProfile(); 
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

router.get("/allComplaints", async (req, res) => {
    // ReportProfile.find({ previousComplaintsCount: { $gte: 2 } } )
    ReportProfile.find({} )
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

router.get("/threeComplaints", async (req, res) => {
    ReportProfile.find({ previousComplaintsCount: { $gte: 2 } } )
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

router.put("/threeComplaints/:accountId", async (req, res) => {
    var id = req.params.accountId;
    const updatestatus = await Signup.findOneAndUpdate({
        _id: id
    },
        { accountStatus: "blocked" },
        {
            new: true,
            // runValidators: true
        })
    res.send({ "Account has been blocked": updatestatus });
})

module.exports = router;