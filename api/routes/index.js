const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Get index page
router.get("/", (req, res, next) => {

    res.render('index.html');
});


module.exports = router;

