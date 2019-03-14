const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Link = require('../models/link');

//Get all links
router.get("/", (req, res, next) => {
    Link.find()
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

//Get link by id
router.get("/:linkId", (req, res, next) => {
    const id = req.params.linkId;
    Link.findById(id)
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

//Post link
router.post("/", (req, res, next) => {

    const link = new Link({
        _id: new mongoose.Types.ObjectId(),
        weekNo: req.body.weekNo,
        no: req.body.no,
        title: req.body.title,
        link: req.body.link,
        type: req.body.type
    });

    Link
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                link: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//Update link by id
router.patch("/:linkId", (req, res, next) => {
    const id = req.params.linkId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Link.update({
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

//Delete link by id
router.delete("/:linkId", (req, res, next) => {
    const id = req.params.linkId;
    Link.remove({
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

