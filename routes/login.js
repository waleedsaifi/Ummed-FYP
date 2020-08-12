const router = require('express').Router();
const mongoose = require('mongoose');
const Signup = mongoose.model("Signup");
const bcrypt = require("bcrypt");
const CreateSession = mongoose.model("CreateSessions");

router.post("/", async (req, res) => {
  const password = req.body.password;
  const person = await Signup.findOne({
    email: req.body.email
  });

  console.log(person, 'person')
  if (person==null) return res.status(400).send("No account registered against the inserted Email Address");

  if (person.accountStatus == "pending") return res.send("Your account will be approved after Admin's Verification");
  if (person.accountStatus == "Blocked") return res.send("Your account has been blocked");

  else {
    // const findPsychologists = await CreateSession.find({ patientId: person.id }, 'psychologistId -_id')
    // const patientActiveSessions = await CreateSession.find({ patientId: person.id, sessionStatus: "Active" })
    //   .populate('psychologistId', 'name email')
    //   .populate('patientId', 'name email')
    //   .populate('paymentId', 'serviceType sessionDate sessionTiming ')

    // const findPatients = await CreateSession.find({ psychologistId: person.id }, 'patientId -_id')
    // const psychologistActiveSessions = await CreateSession.find({ psychologistId: person.id, sessionStatus: "Active" })
    //   .populate('psychologistId', 'name email')
    //   .populate('patientId', 'name email')
    //   .populate('paymentId', 'serviceType sessionDate sessionTiming ')

    bcrypt.compare(password, person.password, function (err, isMatch) {
      if (err) {
        throw err
      } else if (!isMatch) {
        res.send("Incorrect Email Or Password");
      } else {

        // if (person.userRole == "Patient") {
        //   return res.json({ person, Sessions: patientActiveSessions, PsychologistList: findPsychologists })
        // }

        // if (person.userRole == "Psychologist") {
        //   return res.send({Sessions:psychologistActiveSessions})

        //   return res.json({ person, Sessions: psychologistActiveSessions, PatientsList: findPatients })
        // }
        return res.send(person)


      }
    })
  }
})
module.exports = router;