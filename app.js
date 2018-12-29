var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
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

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_jszip', express.static(__dirname + '/node_modules/jszip/'));
app.use('/node_sylb-haiku', express.static(__dirname + '/node_modules/sylb-haiku/'));


app.use('/', index.router);


app.get('/status', function (req, res) {
	res.json(statusCache.json);
})

app.post('/status', async function (req, res) {
  if(req.headers.password == process.env.PASSWORD) {
    delete req.body.password;
  	statusCache.push(req.body);
  	res.send('Update Received.');
  } else {
    console.log('Update Denied!');
    res.send('Update Denied. Check your password!')
  }
})

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
