const http = require('http');
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


        res.render('index.html', {pageCountMessage: null});

});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;