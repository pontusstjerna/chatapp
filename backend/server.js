const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const http = require('http')
const socketIO = require('socket.io')

//placeholders
const index = require('./src/routes/index');
//const authors = require('./src/routes/authors');
//const books = require('./src/routes/books');


import { users } from './src/routes/users';
import { rooms } from './src/routes/rooms';
import { messages } from './src/routes/messages';


const app = express();

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

app.use(logger('dev')); //logs all http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set up db connection
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/chatdb';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Set up routes
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
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({"message": err.message, "documentation_url": "TDB"});
});

const port = process.env.PORT || 3000
app.listen(port);
console.log('===================================');
console.log('Backend running on port: ' + port);


server.listen(4000, () => console.log(`Listening on port 4000`))

io.on('connection', socket => {
  console.log('User connected')
  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('change color', (color) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log('Color Changed to: ', color)
    io.sockets.emit('change color', color)
  })

})
