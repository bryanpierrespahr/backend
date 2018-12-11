const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Lecture = require('../models/lecture');

//Get all lectures
router.get("/", (req, res, next) => {
    Lecture.find()
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

//Get lecture by id
router.get("/:lectureId", (req, res, next) => {
    const id = req.params.lectureId;
    Lecture.findById(id)
        .exec()
        .then(doc => {
            console.log("From database " + doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        })
});

//Post lecture
router.post("/", (req, res, next) => {

    const lecture = new Lecture({
        _id: new mongoose.Types.ObjectId(),
        weekNo: req.body.weekNo,
        no: req.body.no,
        title: req.body.title,
        link: req.body.link,
        type: req.body.type
    });

    lecture
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                lecture: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//Update lecture by id
router.patch("/:lectureId", (req, res, next) => {
    const id = req.params.lectureId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    lecture.update({
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

//Delete lecture by id
router.delete("/:lectureId", (req, res, next) => {
    const id = req.params.lectureId;
    lecture.remove({
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

