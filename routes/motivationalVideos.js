const router = require('express').Router();
const mongoose = require('mongoose');
const MotivationalVideos = mongoose.model("MotivationalVideos");

router.post("/:speakerId", async (req, res, next) => {
    const video = new MotivationalVideos();
    video._id = mongoose.Types.ObjectId();
    video.uploadedBy = req.params.speakerId;
    video.title = req.body.title;
    video.description = req.body.description;
    video.url = req.body.url;
    video.status = req.body.status;

    video.save()
        .then(result => {
            res.status(201).json(
                { "Your video will be uploaded after admin's verification": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.get("/approved", async (req, res) => {
    MotivationalVideos.find({ status: "approved" })
        .populate('uploadedBy', 'name personImage')
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
    MotivationalVideos.find({ status: "pending" })
        .populate('uploadedBy', 'name personImage')
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

router.put("/pending/:videoId", async (req, res) => {
    var id = req.params.videoId;
    const updatestatus = await MotivationalVideos.findOneAndUpdate({
        _id: id
    },
        { status: "approved" },
        {
            new: true,
            // runValidators: true
        })
    res.send({ "Video Status Updated Successfully": updatestatus });
})

router.delete("/pending/:videoId", async (req, res) => {
    const deleteVideo = await MotivationalVideos.findByIdAndRemove({
        _id: req.params.videoId
    });
    res.send({ "Video Deleted Successfully": deleteVideo });
})

module.exports = router;