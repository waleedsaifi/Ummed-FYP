const router = require('express').Router();
const mongoose = require('mongoose');
const Signup = mongoose.model("Signup");
const multer = require('multer');
const bcrypt = require("bcrypt");

const cloudinary = require('cloudinary');
const db = mongoose.connection;
// const upload = multer({dest: 'uploads/'});

// require('../handlers/cloudinary');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {

        cb(new Error('File is not supported'), false)
        return
    } else cb(null, true)
}


const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
})
//  var type =  upload.single('image');
// router.post("/", upload.single('personImage'), async (req, res, next) => {
router.post("/", async (req, res, next) => {

    const person = await Signup.findOne({
        email: req.body.email
    });
    if (person) return res.status(400).send("This Email Address already registered");

    const info = new Signup();
    info._id = mongoose.Types.ObjectId();

    // if (req.file) {
    //     console.log("File attached");
    //     info.personImage = req.file.path;
    // }
    // console.log("file not attached");
    info.cnic = req.body.cnic;
    info.age = req.body.age;
    info.name = req.body.name;
    info.email = req.body.email;
    info.password = req.body.password;
    info.personImage = req.body.personImage;
    info.gender = req.body.gender;
    info.contact = req.body.contact;
    info.userRole = req.body.userRole;
    // console.log(info.password);
    const hash = await bcrypt.hashSync(info.password, 10);
    info.password = hash;
    info.save()
        .then(result => {
            res.status(201).json(
                { "Registered Successfully ": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    // res.send("Registered Successfully => " + info);

})


router.get("/", async (req, res) => {
    const person = await Signup.find({});
    res.send(person)
})

router.get("/:signupId", async (req, res) => {
    const person = await Signup.findOne({ _id: req.params.signupId })
    res.send(person);
})


router.put("/:signupId", async (req, res) => {
    const person = await Signup.findOneAndUpdate({
        _id: req.params.signupId
    },
        req.body,
        {
            new: true,
            runValidators: true
        })
    res.send(person);
})

router.delete("/:signupId", async (req, res) => {
    const person = await Signup.findByIdAndRemove({
        _id: req.params.signupId
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


// router.post("/", async(req, res)=>{

//     const info = new Signup();
//     console.log(req.body);
//     info.cnic = req.body.cnic;
//     info.age = req.body.age;
//     info.name = req.body.name;
//     info.email = req.body.email;
//     info.password = req.body.password;
//     info.gender =req.body.gender;
//     info.contact = req.body.contact;
//     info.userRole = req.body.userRole;
//     // info.address = req.body.address;
//     // info.save();
//     res.send(info);
//     })


module.exports = router;