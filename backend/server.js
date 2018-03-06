import express from 'express';
import mongoose from 'mongoose';
import socket from './src/socket/socket'; 

const app = express();

// Start socket!
socket(app);

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
