console.log("0");

// Set up
var express  = require('server/express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var path = require('path');

// Configuration
//mongoose.connect('mongodb://localhost/reviewking');

console.log("1");

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

console.log("2");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log("3");

// Routes
app.use(express.static(path.join(__dirname + '/../www')));

// views is directory for all template files
app.set('views', __dirname + '/../www');
app.set('view engine', 'html');

console.log("4");

app.get('/', function(request, response) {
  response.render('index');
});

console.log("5");

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
