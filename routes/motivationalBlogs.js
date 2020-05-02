const router = require('express').Router();
const mongoose = require('mongoose');
const MotivationalBlogs = mongoose.model("MotivationalBlogs");

router.post("/:bloggerId", async (req, res, next) => {
    const blog = new MotivationalBlogs();
    blog._id = mongoose.Types.ObjectId();
    blog.uploadedBy = req.params.bloggerId;
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.status = req.body.status;
    blog.save()
        .then(result => {
            res.status(201).json(
                { "Your Blog will be uploaded after admin's verification": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.get("/approved", async (req, res) => {
    MotivationalBlogs.find({ status: "approved" })
        .populate('uploadedBy', 'name')
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

router.get("/pending", async (req, res) => {
    MotivationalBlogs.find({ status: "pending" })
        .populate('uploadedBy', 'name')
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

router.put("/pending/:blogId", async (req, res) => {
    var id = req.params.blogId;
    const updatestatus = await MotivationalBlogs.findOneAndUpdate({
        _id: id
    },
        { status: "approved" },
        {
            new: true,
            // runValidators: true
        })
    res.send({ "Blog Status Updated Successfully": updatestatus });
})

router.delete("/pending/:blogId", async (req, res) => {
    const deleteBlog = await MotivationalBlogs.findByIdAndRemove({
        _id: req.params.blogId
    });
    res.send({ "Blog Deleted Successfully": deleteBlog });
})


module.exports = router;