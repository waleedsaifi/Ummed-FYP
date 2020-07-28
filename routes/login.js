const router = require('express').Router();
const mongoose = require('mongoose');
const Signup = mongoose.model("Signup");
const bcrypt = require("bcrypt");


// router.post("/", async(req, res)=>{
//     const email = req.body.email;
//     const password = req.body.password;
//     Signup.findOne({email: email, password: password},function(err, result){
//         if(!result){
//             res.send({error : "User Not Found"})}
//         else{res.send(result)}})})


router.post("/", async (req, res) => {
  const password = req.body.password;
  const person = await Signup.findOne({
    email: req.body.email
  });
  console.log(person.accountStatus)
  if (!person) return res.status(400).send("No account registered against the inserted Email Address");

  if (person.accountStatus == "pending") return res.send("Your account will be approved after Admin's Verification");
  if (person.accountStatus == "Blocked") return res.send("Your account will be approved after Admin's Verification");

  else
    bcrypt.compare(password, person.password, function (err, isMatch) {
      if (err) {
        throw err
      } else if (!isMatch) {
        res.send("Incorrect Email Or Password");
      } else {
        res.send(person)
      }
    })
})
module.exports = router;