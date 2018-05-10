var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var acme = require('./routes/acme.js');
acme.start();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/acme', acme);

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

var mongoose = require('mongoose');
function dbConnect () 
{
  mongoose.Promise = require('bluebird');
  mongoose.connect("mongodb://mongodb/deric_test", 
   { 
     promiseLibrary: require('bluebird') 
   })
  	.then( () => console.log('connection successful' ))
    .catch( (err) => {
      console.error(err)
      console.log("Setting timeout or 1 second to reconnect");
      setTimeout(dbConnect,1000);
    });
  }

  dbConnect();

  module.exports = app;
