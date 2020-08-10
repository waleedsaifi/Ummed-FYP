const router = require('express').Router();
const mongoose = require('mongoose');
const HealthExercises = mongoose.model("HealthExercises");

router.post("/:instructorId", async (req, res, next) => {
    const exercise = new HealthExercises();
    exercise._id = mongoose.Types.ObjectId();
    exercise.uploadedBy = req.params.instructorId;
    exercise.title = req.body.title;
    exercise.content = req.body.content;
    exercise.status = req.body.status;

    exercise.save()
        .then(result => {
            res.status(201).json(
                { "Your Daily Health Exercise will be uploaded after admin's verification": result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.get("/approved", async (req, res) => {
    HealthExercises.find({ status: "approved" })
        .populate('uploadedBy', 'name personImage')
        .populate("comments.postedBy", "_id name personImage")
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
    HealthExercises.find({ status: "pending" })
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

router.put("/pending/:exerciseId", async (req, res) => {
    var id = req.params.exerciseId;
    const updatestatus = await HealthExercises.findOneAndUpdate({
        _id: id
    },
        { status: "approved" },
        {
            new: true,
            // runValidators: true
        })
    res.send({ "Exercise Status Updated Successfully": updatestatus });
})

router.delete("/pending/:exerciseId", async (req, res) => {
    const deleteExercise = await HealthExercises.findByIdAndRemove({
        _id: req.params.exerciseId
    });
    res.send({ "Exercise Deleted Successfully": deleteExercise });
})

router.put("/like/:exerciseId/:personId", async (req, res) => {
    var id = req.params.exerciseId;
    HealthExercises.findOneAndUpdate(
        { _id: id },
        {
            $push: { likes: req.params.personId },
            $pull: { dislikes: req.params.personId },
        },
        { new: true, })
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

router.put("/dislike/:exerciseId/:personId", async (req, res) => {
    var id = req.params.exerciseId;
    HealthExercises.findOneAndUpdate(
        { _id: id },
        {
            $push: { dislikes: req.params.personId },
            $pull: { likes: req.params.personId }
        },
        { new: true, })
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


router.put("/comment/:exerciseId/:personId", async (req, res) => {

    const comment = {
        comment: req.body.comment,
        postedBy: req.params.personId
    }
    console.log(comment);
    var id = req.params.exerciseId;
    HealthExercises.findOneAndUpdate(
        { _id: id },
        { $push: { comments: comment } },
        { new: true, })
        .populate("comments.postedBy", "_id name personImage")
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