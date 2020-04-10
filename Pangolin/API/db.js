const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PangolinDB',{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false }, (err) => {
  if (!err)
    console.log('MongoDb connection succeded.');
  else
    console.log('MongoDB error');
});

module.exports = mongoose;
