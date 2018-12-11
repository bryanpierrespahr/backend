const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const passwordHash = require('password-hash');

//Get all users
router.get("/", (req, res, next) => {
    User.find()
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

//Get user by id
router.get("/:userid", (req, res, next) => {
    const id = req.params.userid;
    User.findById(id)
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

//Post user
router.post("/", (req, res, next) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
    });

    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                user: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//Post user
router.post("/dev", (req, res, next) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
    });

    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                user: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//Update user by id
router.patch("/:userId", (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({
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


//Delete user by id
router.delete("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.remove({
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

        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }

        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
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
        })

        findUser.then(function () {
            var _u = new User({
                _id: new mongoose.Types.ObjectId(),
                email: user.email,
                password: user.password
            });
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Interal error"
                    })
                } else {
                    res.status(200).json({
                        "text": "Success",
                        "token": user.getToken()
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Internal error"
                    })
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
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Internal error",
                })
            }
            else if (!user) {
                res.status(401).json({
                    "text": "User does not exist"
                })
            }
            else {
                if (user.authenticate(req.body.password)) {
                    res.status(200).json({
                        "student": user,
                        "token": user.getToken(),
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

