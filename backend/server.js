const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const index = require('./src/routes/index');
const authors = require('./src/routes/authors');
const books = require('./src/routes/books');

const app = express();

app.use(logger('dev')); //logs all http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set up db connection
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/library';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Set up routes
app.use('/', index);
app.use('/authors', authors);
app.use('/books', books);

// catch req if not caught by router, set 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({"message": err.message, "documentation_url": "TDB"});
});

const port = process.env.PORT || 3000
app.listen(port);
console.log('===================================');
console.log('Backend running on port: ' + port);
