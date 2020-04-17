const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var PangolinSchema = new mongoose.Schema({
	username: { type: String, require: true },
	password: { type: String, require: true },
	age: { type: Number, require: true },
	famille: { type: String, require: true },
	race: { type: String, require: true },
	nourriture: { type: String, require: true },
});

PangolinSchema.pre('save', function (next) {
	var pangolin = this;
	bcrypt.hash(pangolin.password, 10, function (err, hash){
		if (err) {
			return next(err);
		}
		pangolin.password = hash;
		next();
	})
});

PangolinSchema.statics.nameExist = function (username) {
	Pangolin.findOne( { username: username } ).exec( (err, user) => {
		if(err)
			return err;
		if (!user)
			return true;
		return false;
	});
}

PangolinSchema.statics.authenticate = function (username, password, callback) {
	Pangolin.findOne({ username: username }).exec(function (err, user) {
		if (err) {
		  return callback(err)
		} else if (!user) {
		  var err = new Error('User not found.');
		  err.status = 401;
		  return callback(err);
		}
		bcrypt.compare(password, user.password, function (err, result) {
		  if (result === true) {
			return callback(null, user);
		  } else {
			return callback();
		  }
		})
	});
};

var Pangolin = mongoose.model('Pangolin', PangolinSchema);

module.exports = { Pangolin };