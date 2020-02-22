const router = require('express').Router();
const mongoose = require('mongoose');
const Signup = mongoose.model("Signup");
const multer = require('multer');
const cloudinary = require('cloudinary')


require('../handlers/cloudinary');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
}); 

const fileFilter = (req, file, cb) =>{
    if(!file.mimetype.match(/jpe|jpeg|png|gif$i/)){

    cb(new Error('File is not supported'),false)
     return
    }else cb(null, true)
}

const upload = multer({
    storage: storage,
    limits:{fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
})


router.get("/", async(req, res)=>{
    const person = await Signup.find({});
    res.send(person)
    })
    
router.get("/:signupId",async (req,res)=>{
    const person = await Signup.findOne({_id:req.params.signupId})
    res.send(person);
    })
    
    
router.put("/:signupId", async (req, res)=>{
    const person = await Signup.findOneAndUpdate({
        _id:req.params.signupId
    },
    req.body,
    {
        new: true,
        runValidators: true
    })
    res.send(person);
    })
    
router.delete("/:signupId", async(req, res)=>{
    const person = await Signup.findByIdAndRemove({
        _id:req.params.signupId
    });
        res.send(person);
    })
    
// router.post("/", upload.single('personImage'), async(req, res)=>{
//     const cloudImage= await cloudinary.v2.uploader.upload(req.file.path);
//     // res.send(cloudImage);
//     // console.log(req.file);
//     const info = new Signup();
//     info.cnic = req.body.cnic;
//     info.age = req.body.age;
//     info.name = req.body.name;
//     info.email = req.body.email;
//     info.password = req.body.password;
//     info.gender =req.body.gender;
//     info.contact = req.body.contact;
//     info.address = req.body.address;
//     info.imageurl = cloudImage.secure_url

//         // console.log(info.body)
//     info.save();
//     res.send(info);
//     })


router.post("/", async(req, res)=>{

    const info = new Signup();
    const person = await Signup.find({
        email:req.params.email,
        cnic:req.params.cnic
    });

    if(person){
        res.send("This email is already registered");
    }else{
    info.cnic = req.body.cnic;
    info.age = req.body.age;
    info.name = req.body.name;
    info.email = req.body.email;
    info.password = req.body.password;
    info.gender =req.body.gender;
    info.contact = req.body.contact;
    // info.address = req.body.address;
    info.save();
    res.send(info);
    }
    })


module.exports = router;