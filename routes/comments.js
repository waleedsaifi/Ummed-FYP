const router = require('express').Router();
const mongoose = require('mongoose');
const Comments = mongoose.model("Comments");
const MotivationalBlogs = mongoose.model("MotivationalBlogs");

router.post("/:personId/:blogId", async (req, res, next) => {
    // console.log("hello From Feedabck")
    const comments = new Comments();
    comments._id = mongoose.Types.ObjectId();
    comments.givenBy = req.params.personId;
    comments.onPost = req.params.blogId;
    comments.commentText = req.body.commentText;
    comments.save()
        .then(result => {
            res.status(201).json(
                { "Comment Stored Successfully ": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.get("/", async (req, res) => {
    Comments.find()
        .populate('givenBy', 'name')
        .populate('onPost', 'uploadedBy title')
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
router.get("/:postId", async (req, res) => {
    var id = req.params.postId
    await Comments.find({onPost:{_id: id} })
    .populate('givenBy', 'name')
    .populate('onPost', 'uploadedBy title')
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