const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Student = require('../models/student');
const passwordHash = require('password-hash');

//Get all students
router.get("/", (req, res, next) => {
    Student.find()
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

//Get student by id
router.get("/:studentId", (req, res, next) => {
    const id = req.params.studentId;
    Student.findById(id)
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


//Post student
router.post("/", (req, res, next) => {

    const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        number: req.body.number,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        courses: req.body.courses,
    });

    student
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                student: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//Update student by id
router.patch("/:studentId", (req, res, next) => {
    const id = req.params.studentId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Student.update({
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

//Post quiz results
router.patch("/:studentId/quiz", (req, res, next) => {

    const id = req.params.studentId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Student.update({
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

//Delete student by id
router.delete("/:studentId", (req, res, next) => {
    const id = req.params.studentId;
    Student.remove({
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

//Signup
router.post('/signup', (req, res) => {

    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            "text": "Invalid request"
        })
    } else {

        var student = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            number: req.body.number,
            email: req.body.email,
            password: passwordHash.generate(req.body.password),
            courses : req.body.courses
        };

        var findStudent = new Promise(function (resolve, reject) {
            Student.findOne({
                email: student.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        });

        findStudent.then(function () {
            var _u = new Student({
                _id: new mongoose.Types.ObjectId(),
                firstName : student.firstName,
                lastName : student.lastName,
                number : student.number,
                email: student.email,
                password: student.password,
                courses : student.courses,
            });
            _u.save(function (err, student) {
                if (err) {
                    res.status(500).json({
                        "text": "Interal error"
                    })
                } else {
                    res.status(200).json({
                        "text": "Success",
                        "token": student.getToken()
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Internal error"
                    });
                    break;
                case 204:
                    res.status(204).json({
                        "text": "E-mail address already exists"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Internal error"
                    })
            }
        })
    }
});

//Login
router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            "text": "Invalid request"
        })
    } else {
        Student.findOne({
            email: req.body.email
        }, function (err, student) {
            if (err) {
                res.status(500).json({
                    "text": "Internal error",
                })
            }
            else if (!student) {
                res.status(401).json({
                    "text": "Student does not exist"
                })
            }
            else {
                if (student.authenticate(req.body.password)) {
                    res.status(200).json({
                        "student": student,
                        "token": student.getToken(),
                    })
                }
                else {
                    res.status(401).json({
                        "text": "Wrong password"
                    })
                }
            }
        })
    }
});

module.exports = router;

