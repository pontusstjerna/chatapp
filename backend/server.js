const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const index = require('./src/routes/index');

import { users } from './src/routes/users';
import { rooms } from './src/routes/rooms';
import { messages } from './src/routes/messages';

import socket from './src/socket/socket'; 

const app = express();

// Start socket!
socket(app);

app.use(logger('dev')); //logs all http requests
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set up db connection
//Set up default mongoose connection
//const mongoDB = 'mongodb://127.0.0.1/chatdb';

var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
    mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
    mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
    mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
    mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
    mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
  // Provide UI label that excludes user id and pw
  mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
  mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}

if (!mongoURL) {
  mongoURL = 'mongodb://127.0.0.1/chatdb';
}
console.log('Trying to connect to db: ' + mongoURL);

mongoose.connect(mongoURL);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Set up routes
app.use(cors());
app.use('/', index);
//app.use('/authors', authors);
//app.use('/books', books);
app.use('/users', users());
app.use('/rooms', rooms());
app.use('/messages', messages());
// catch req if not caught by router, set 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.header()
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({"message": err.message, "documentation_url": "TDB"});
});

const port = process.env.PORT || 3001
app.listen(port);
console.log('===================================');
console.log('Backend running on port: ' + port);
