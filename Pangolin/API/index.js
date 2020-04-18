const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

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

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/api', PangolinController);
