//const http = require('http');
const app = require('./app');

// const port = 3001;
//const server = http.createServer(app);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

//server.listen(port);

app.listen(port, ip);

console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;