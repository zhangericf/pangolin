var app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var users = [];
var sockets = [];
var pos = 0;

var PangolinController = require('./Controller/PangolinController')

mongoose.connect('mongodb://localhost:27017/PangolinDB',{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false }, (err) => {
  if (!err)
    console.log('MongoDb connection succeded.');
  else
    console.log('MongoDB error');
});

var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => console.log('Api started at port : 3000'));

app.use('/api', PangolinController);

io.on('connection', (socket) => {

  const _id = socket.id;

  socket.on('user_id', (data) => {
    if (!users.includes(data)) {
      console.log('new user : ' + data);
      users.push(data);
      users[data] = socket;
      sockets.push(_id);
    } else {
      console.log('user already connected');
    }
    io.emit('users', users);
    io.emit('stats', users.length);
  });

  socket.on('disconnect', function() {
    console.log("deconnection " + _id);
    pos = sockets.indexOf(_id);
    if (pos != -1) {
      users.splice(pos, 1);
      sockets.splice(pos, 1);
    }
    io.emit('stats', users.length);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('private message', (from, msg) => {
    io.emit('private message' + from, msg);
  });

});

http.listen(4000, () => {
  console.log('Socket listening on *:4000');
});