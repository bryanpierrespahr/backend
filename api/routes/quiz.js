const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Quiz = require('../models/quiz');

//Get all quizzes
router.get("/", (req, res, next) => {
    Quiz.find()
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

//Get quiz by id
router.get("/:quizId", (req, res, next) => {
    const id = req.params.quizId;
    Quiz.findById(id)
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

//Post quiz
router.post("/", (req, res, next) => {

    const quiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        weekNo: req.body.weekNo,
        no: req.body.no,
        title: req.body.title,
        type: req.body.type,
        questions: req.body.questions,
    });

    Quiz
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                quiz: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//Update quiz by id
router.patch("/:quizId", (req, res, next) => {
    const id = req.params.quizId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Quiz.update({
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

//Delete quiz by id
router.delete("/:quizId", (req, res, next) => {
    const id = req.params.quizId;
    Quiz.remove({
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

