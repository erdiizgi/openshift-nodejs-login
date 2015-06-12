var express    = require('express'),
    validator  = require('express-validator'),
    app        = express(),
    bodyParser = require('body-parser');

// configure app to use bodyParser() which will get the data from a POST
app.use(require('express-method-override')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator);
app.use(express.static(__dirname + '/public'));

var http = require('http');
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port = process.env.OPENSHIFT_NODEJS_PORT || '8080';

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, ip);
console.log('Server running at http://'+ip+':'+port+'/');

// REGISTER ROUTES
app.use('/', require('./routes').router);

// START THE SERVER
app.listen(port);
console.log('--Server started at port: '+port+"--");




