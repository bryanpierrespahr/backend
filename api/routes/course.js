const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course');

//Get course by id
router.get("/:courseId", (req, res, next) => {
    const id = req.params.courseId;
    Course.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
});

//Get all courses
router.get("/", (req, res, next) => {
    Course.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



//Post course
router.post("/", (req, res, next) => {

    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        code: req.body.code,
        scope: req.body.scope,
        timing: req.body.timing,
        language: req.body.language,
        level: req.body.level,
        type: req.body.type,
        path: req.body.path,
        objectives: req.body.objectives,
        teacherId: req.body.teacherId,
        schedule : req.body.schedule,
        weeksId: req.body.weeks,
        weeksId: req.body.students,
    });

    course
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                course: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//Update course by id
router.patch("/:courseId", (req, res, next) => {
    const id = req.params.courseId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Course.update({
        _id: id
    }, {
        $set: updateOps
    })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

//Delete course by id
router.delete("/:courseId", (req, res, next) => {
    const id = req.params.courseId;
    Course.remove({
        _id: id
    })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;

