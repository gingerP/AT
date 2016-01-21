var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

function renderError(res) {
  res.sendFile(__dirname + '/views/index.html');
}

require('./src/js/controller-api').init(app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'src')));
app.use('/static/css', express.static(__dirname + '/src/web/css'));
app.use('/static/bower', express.static(__dirname + '/bower_components'));
app.use('/static/images', express.static(__dirname + '/src/web/images'));
app.use('/static/js', express.static(__dirname + '/src/web/js'));
app.use('/static/fonts', express.static(__dirname + '/src/web/fonts'));
app.use('/static/templates', express.static(__dirname + '/src/web/templates'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/', function(res) {
  res.sendFile(__dirname + '/views/index.html');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error('%s: %s', Date(Date.now()), err.message);
    renderError(res);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error('%s: %s', Date(Date.now()), err.message);
  renderError(res);
});


module.exports = app;
