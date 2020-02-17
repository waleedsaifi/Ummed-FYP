const router = require('express').Router();
const mongoose = require('mongoose');
const Signup = mongoose.model("Signup");


router.post("/", async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    // res.send(email+password) 
    // console.log(email);
    // console.log(password);

    Signup.findOne({email: email, password: password},function(err, result){

        if(!result){
            res.send({
                error : "UserNot Found"
            })
        }
        else{
            res.send(result)
        }
    })

    })


    module.exports = router;