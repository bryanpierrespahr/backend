
const mongoose = require("mongoose");
const http = require('http');
const User = require('./api/models/user');
//const app = require('./app');

// const port = 3001;

const server = http.createServer(app);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

//server.listen(port);

var express = require('express');
var app = express();
var morgan = require('morgan');


app.get('/', function (req, res) {


        res.render('index.html');

});

//Get user by id
app.get("/user", (req, res, next) => {

        User.findById("5c46bf50ee84d149a7394ee3")
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


//Get user by id
app.get("/test", (req, res, next) => {

   console.log("TEST");
});



//Get user by id
app.get("/user/:userid", (req, res, next) => {
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



app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;