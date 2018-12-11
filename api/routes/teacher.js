const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Teacher = require('../models/teacher');

//Get all teachers
router.get("/", (req, res, next) => {
    Teacher.find()
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

//Get teacher by id
router.get("/:teacherId", (req, res, next) => {
    const id = req.params.teacherId;
    Teacher.findById(id)
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

//Post teacher
router.post("/", (req, res, next) => {

    const teacher = new Teacher({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    teacher
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                teacher: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//Update teacher by id
router.patch("/:teacherId", (req, res, next) => {
    const id = req.params.teacherId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Teacher.update({
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

//Delete teacher by id
router.delete("/:teacherId", (req, res, next) => {
    const id = req.params.teacherId;
    Teacher.remove({
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

