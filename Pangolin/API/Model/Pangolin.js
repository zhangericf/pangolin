const mongoose = require('mongoose');

var Pangolin = mongoose.model('Pangolin', {
    username: { type: String },
    password: { type: String },
    age: { type: Number },
    famille: { type: String },
    race: { type: String },
    nourriture: { type: String },
});

module.exports = { Pangolin };