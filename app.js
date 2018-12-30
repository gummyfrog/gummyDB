var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');

var Index = require('./routes/index');
var app = express();
var statuscache = require('./src/statusCache.js')

const statusCache = new statuscache();
const index = new Index(statusCache);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index.router);


app.get('/status', function (req, res) {
	res.json(statusCache.json);
});

app.post('/read', function(req, res) {
  var found = statusCache.read(req.body.filename);
  console.log(found);
  res.send(found);
});



app.post('/status', function (req, res) {
  if(req.headers.password != process.env.PASSWORD) {
    res.send('Check your password!');
    return;
  }

  	statusCache.push(req.body);
  	res.send('Update Received.');
});



app.post('/store', function (req, res) {
  if(req.headers.password != process.env.PASSWORD) {
    res.send('Check your password!');
    return;
  }
  statusCache.write(req.body.filename + '.json', req.body);
  res.send('Object Retrieved. Moving to the fridge...');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
