const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var PangolinSchema = new mongoose.Schema({
	username: { type: String, require: true },
	password: { type: String, require: true },
	age: { type: Number, require: true },
	famille: { type: String, require: true },
	race: { type: String, require: true },
	nourriture: { type: String, require: true },
	tokens: [{ token: { type: String, required: true  } }]
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

PangolinSchema.methods.generateAuthToken = async function() {
	// Generate an auth token for the user
	const pangolin = this;
	const token = jwt.sign({_id: pangolin._id}, "IReallyNeedATraineeship2020");
	pangolin.tokens = pangolin.tokens.concat({ token });
	await pangolin.save();
	return token;
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