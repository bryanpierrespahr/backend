const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Week = require('../models/week');

//Get all weeks
router.get("/", (req, res, next) => {
    Week.find()
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

//Get week by id
router.get("/:weekId", (req, res, next) => {
    const id = req.params.weekId;
    Week.findById(id)
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


//Post week
router.post("/", (req, res, next) => {

    const week = new Week({
        _id: new mongoose.Types.ObjectId(),
        no: req.body.no,
        lecturesId: req.body.lectures,
        linksId: req.body.links,
        quizzesId: req.body.quizzes
    });

    week
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                week: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//Update week by id
router.patch("/:weekId", (req, res, next) => {
    const id = req.params.weekId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Week.update({
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

//Delete week by id
router.delete("/:weekId", (req, res, next) => {
    const id = req.params.weekId;
    Week.remove({
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

